import { Module, ValidationPipe } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiServerConfig } from './config/api-server-config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ApiServerConfig],
  controllers: [ApiController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }, ApiService],
})
export class ApiModule {}
