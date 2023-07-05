import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { JWT_REFRESH_OPTIONS, JwtPayload } from '../constants/jwt.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  private apiKeys: string[] = [process.env.API_KEY];

  validateApiKey(apiKey: string): string {
    return this.apiKeys.find((key) => key === apiKey);
  }

  validateJwt(payload: JwtPayload): boolean {
    return !!payload.id && !!payload.nid && !!payload.email;
  }

  getRefreshToken(payload: JwtPayload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_OPTIONS.secret,
      expiresIn: JWT_REFRESH_OPTIONS.expiresIn,
    });
    return {
      refreshToken: refreshToken,
      path: '/sign/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: JWT_REFRESH_OPTIONS.expiresIn * 1000,
    };
  }

  getCookieForLogout(): any {
    return {
      accessOption: {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
