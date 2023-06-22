import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class AuthService {
  private apiKeys: string[] = [process.env.API_KEY];

  validateApiKey(apiKey: string): string {
    return this.apiKeys.find((key) => key === apiKey);
  }
}
