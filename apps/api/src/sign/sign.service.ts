import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpInDto } from './dto/sign-up-in.dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { User } from '@libs/dao/common/user/user.entity';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { SignUpOutDto } from './dto/sign-up-out.dto';
import { SignInInDto } from './dto/sign-in-in.dto';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { JwtPayload } from '../constants/jwt.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async signUp(signUpInDto: SignUpInDto): Promise<SignUpOutDto> {
    // 1. 이미 가입된 이메일 2. 이미 존재하는 닉네임
    await this._isAlreadyUsed(signUpInDto);
    const user = await this.userRepository.save(new User(signUpInDto));

    const signUpOutDto = SignUpOutDto.fromEntity(user);
    return signUpOutDto;
  }

  private async _isAlreadyUsed(signUpInDto: SignUpInDto) {
    await this.userService.countByEmail(signUpInDto.email);
    await this.userService.checkNickName(signUpInDto.nickName);
  }

  async signIn(signInInDto: SignInInDto): Promise<UserDto> {
    const { email, password } = signInInDto;
    // 유저 찾기
    const user = await this.userService.findByEmail(email);

    // password 검증
    if (!(await user.checkPassword(password))) {
      throw new InternalServerErrorException(
        InternalErrorCode.AUTH_USER_MISMATCHED_PASSWORD,
        'AUTH_USER_MISMATCHED_PASSWORD',
      );
    }

    return UserDto.fromEntity(user);
  }

  async signOut() {}

  signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
