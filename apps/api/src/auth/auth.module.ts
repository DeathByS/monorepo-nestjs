import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategy/api-key.strategy';

@Module({
  imports: [PassportModule],
  providers: [ApiKeyStrategy, AuthService],
})
export class AuthModule {}
