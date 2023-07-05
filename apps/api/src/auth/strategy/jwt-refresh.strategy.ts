import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JWT_REFRESH_OPTIONS } from '../../constants/jwt.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.RefreshToken;
        },
      ]),
      secretOrKey: JWT_REFRESH_OPTIONS.secret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.cookies?.RefreshToken;
    return this.userService.getUserIfRefreshTokenMatches(
      payload.id,
      refreshToken,
    );
  }
}
