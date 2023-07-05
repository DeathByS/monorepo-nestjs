import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SignInInDto } from './dto/sign-in-in.dto';
import { SignUpInDto } from './dto/sign-up-in.dto';
import { SignService } from './sign.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, ResponseEntity } from '@libs/common/network/response-entity';
import { SignUpOutDto } from './dto/sign-up-out.dto';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { JwtPayload } from '../constants/jwt.constants';
import { SignInOutDto } from './dto/sign-in-out.dto';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { JwtRefreshAuthGuard } from '../auth/guard/jwt-refresh-auth.guard';
import { CurrentUser } from '@libs/common/decorator/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiSecurity('apiKey')
@UseGuards(AuthGuard('apiKey'))
@ApiTags('sign')
@Controller('sign')
export class SignController {
  constructor(
    private readonly signService: SignService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiResponseEntity({ type: SignInOutDto, summary: '로그인' })
  @Post('/in')
  async signIn(
    @Res({ passthrough: true }) res,
    @Body() signInInDto: SignInInDto,
  ): Promise<ResponseEntity<SignInOutDto>> {
    const userDto = await this.signService.signIn(signInInDto);

    const payload: JwtPayload = {
      id: userDto.id,
      nid: userDto.nid,
      email: userDto.email,
    };

    // access token
    const accessToken = this.signService.signJwt(payload);

    // refresh token
    const { refreshToken, ...refreshTokenOption } =
      this.authService.getRefreshToken(payload);

    res.cookie('RefreshToken', refreshToken, refreshTokenOption);

    // user record 에도 refresh token 저장
    await this.userService.setRefreshToken(userDto.id, refreshToken);

    return new ResponseEntity<SignInOutDto>()
      .ok()
      .body(SignInOutDto.of().setAccessToken(accessToken));
  }
  @ApiResponseEntity({ type: SignUpOutDto, summary: '회원 가입' })
  @Post('/up')
  async signUp(
    @Body() signUpInDto: SignUpInDto,
  ): Promise<ResponseEntity<SignUpOutDto>> {
    const signUpOutDto = await this.signService.signUp(signUpInDto);
    return new ResponseEntity<SignUpOutDto>().ok().body(signUpOutDto);
  }

  @Get('/refresh')
  @ApiResponseEntity({ type: SignInOutDto, summary: 'access token refresh' })
  @UseGuards(JwtRefreshAuthGuard)
  refreshAccessToken(@CurrentUser() user): ResponseEntity<SignInOutDto> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      nid: user.nid,
    };

    const accessToken = this.signService.signJwt(payload);
    return new ResponseEntity<SignInOutDto>()
      .ok()
      .body(SignInOutDto.of().setAccessToken(accessToken));
  }

  @Post('/out')
  @ApiResponseEntity({ summary: '로그아웃' })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  async signOut(
    @CurrentUser() user,
    @Res({ passthrough: true }) res,
  ): Promise<Response> {
    await this.userService.signOut(user.id);
    const refreshTokenOption = this.authService.getCookieForLogout();
    res.cookie('RefreshToken', '', refreshTokenOption);
    return new ResponseEntity().ok().build();
  }
}
