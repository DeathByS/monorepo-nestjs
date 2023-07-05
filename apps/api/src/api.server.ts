import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

export class ApiServer {
  constructor(private readonly app: INestApplication) {}

  async init() {
    const config = new DocumentBuilder()
      .setTitle('Api Study Server')
      .setDescription('Nest.js monorepo-typeorm based api server study')
      .setVersion('1.0')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'X-API-KEY',
          in: 'header',
          description: 'api-key',
        },
        'apiKey',
      )
      .addBearerAuth(
        {
          type: 'http',
          name: 'Authorization',
          in: 'header',
          description: 'jwt auth',
        },
        'jwt',
      )
      /*
      .addCookieAuth(
        'RefreshToken',
        {
          type: 'apiKey',
          in: 'cookie',
          description: 'cookie refresh token',
        },
        'jwt-refresh',
      )*/
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
    this.app.useGlobalPipes(new ValidationPipe());
    //request.cookies 를 바로 사용하기 위해 추가
    this.app.use(cookieParser());
  }

  async run() {
    await this.app.listen(process.env.SERVER_PORT, '0.0.0.0');
  }
}
