import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SignInInDto } from './dto/sign-in-in.dto';
import { SignUpInDto } from './dto/sign-up-in.dto';
import { SignService } from './sign.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { SignUpOutDto } from './dto/sign-up-out.dto';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';

@ApiSecurity('apiKey')
@UseGuards(AuthGuard('apiKey'))
@ApiTags('sign')
@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}
  // @Post('/in')
  // async signIn(@Body() signInInDto: SignInInDto) {}
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
