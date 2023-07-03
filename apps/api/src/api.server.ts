import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
    this.app.useGlobalPipes(new ValidationPipe());
  }

  async run() {
    await this.app.listen(process.env.SERVER_PORT, '0.0.0.0');
  }
}
