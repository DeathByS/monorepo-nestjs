import { Module, ValidationPipe } from '@nestjs/common';
import { ApiServerConfig } from './config/api-server-config';
import { APP_PIPE } from '@nestjs/core';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from '@libs/dao/common/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commonTypeOrmModuleOptions } from '@libs/common/database/typeorm/typeorm-module.options';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ApiServerConfig,
    TypeOrmModule.forRoot(commonTypeOrmModuleOptions),
    UserModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }, UserService],
})
export class ApiModule {}
