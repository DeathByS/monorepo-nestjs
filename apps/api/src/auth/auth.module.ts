import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategy/api-key.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_OPTIONS } from '../constants/jwt.constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_OPTIONS.secret,
      signOptions: { expiresIn: JWT_OPTIONS.expiresIn },
    }),
  ],
  providers: [ApiKeyStrategy, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
