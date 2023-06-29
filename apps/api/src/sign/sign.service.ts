import { Injectable } from '@nestjs/common';
import { SignUpInDto } from './dto/sign-up-in.dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { User } from '@libs/dao/common/user/user.entity';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { SignUpOutDto } from "./dto/sign-up-out.dto";

@Injectable()
export class SignService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}
  async signUp(signUpInDto: SignUpInDto) {
    await this._isAlreadyUsed(signUpInDto);
    const user = await this.userRepository.save(new User(signUpInDto));

    const signUpOutDto = SignUpOutDto.fromEntity(user);
    return signUpOutDto;
  }

  private async _isAlreadyUsed(signUpInDto: SignUpInDto) {
    await this.userService.countByEmail(signUpInDto.email);
    await this.userService.checkNickName(signUpInDto.nickName);
  }
}
