import { INestApplication, ValidationPipe } from '@nestjs/common';

export class ApiServer {
  constructor(private readonly app: INestApplication) {}

  async init() {
    // if (process.env.NODE_ENV !== 'prod') {
    // }
    this.app.useGlobalPipes(new ValidationPipe());
  }

  async run() {
    await this.app.listen(process.env.SERVER_PORT, '0.0.0.0');
  }
}
