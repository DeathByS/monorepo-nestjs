import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { UserService } from '../user/user.service';
import { UserModule } from '@libs/dao/common/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SignService, UserService],
})
export class SignModule {}
