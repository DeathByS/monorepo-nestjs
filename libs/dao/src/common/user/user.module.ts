import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@libs/dao/common/user/user.entity';
import { UserRepository } from '@libs/dao/common/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserRepository],
  providers: [UserRepository],
})
export class UserModule {}
