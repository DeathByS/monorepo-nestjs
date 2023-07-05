import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategy/api-key.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_OPTIONS } from '../constants/jwt.constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { UserModule } from '@libs/dao/common/user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_OPTIONS.secret,
      signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ApiKeyStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
