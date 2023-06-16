import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }
    return UserDto.fromEntity(user);
  }
}
