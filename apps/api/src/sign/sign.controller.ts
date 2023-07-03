import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SignInInDto } from './dto/sign-in-in.dto';
import { SignUpInDto } from './dto/sign-up-in.dto';
import { SignService } from './sign.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { SignUpOutDto } from './dto/sign-up-out.dto';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { JwtPayload } from '../constants/jwt.constants';
import { SignInOutDto } from './dto/sign-in-out.dto';

@ApiSecurity('apiKey')
@UseGuards(AuthGuard('apiKey'))
@ApiTags('sign')
@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}
  @ApiResponseEntity({ type: SignInOutDto, summary: '로그인' })
  @Post('/in')
  async signIn(
    @Body() signInInDto: SignInInDto,
  ): Promise<ResponseEntity<SignInOutDto>> {
    const userDto = await this.signService.signIn(signInInDto);

    const payload: JwtPayload = {
      id: userDto.id,
      nid: userDto.nid,
      email: userDto.email,
    };

    const accessToken = this.signService.signJwt(payload);

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
  // @Post('/out')
  // async signOut() {}
}
