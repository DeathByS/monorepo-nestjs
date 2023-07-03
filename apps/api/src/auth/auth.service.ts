import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { JwtPayload } from '../constants/jwt.constants';

@Injectable()
export class AuthService {
  private apiKeys: string[] = [process.env.API_KEY];

  validateApiKey(apiKey: string): string {
    return this.apiKeys.find((key) => key === apiKey);
  }

  validateJwt(payload: JwtPayload): boolean {
    return !!payload.nid && !!payload.email;
  }
}
