import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { UserService } from '../user/user.service';
import { UserModule } from '@libs/dao/common/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  providers: [SignService, UserService, JwtService],
})
export class SignModule {}
