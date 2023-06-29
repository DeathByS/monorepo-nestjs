import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { PageOptionsDto } from '@libs/common/pagination/dto/page-options.dto';
import { PageMetaDto } from '@libs/common/pagination/dto/page-meta.dto';
import { UpdateUserNicknameInDto } from './dto/update-user-nickname-in.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }
    return UserDto.fromEntity(user);
  }

  async findByNid(nid: string): Promise<UserDto> {
    const user = await this.userRepository.findByNid(nid);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }
    return UserDto.fromEntity(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NOT_FOUND,
        'USER_NOT_FOUND',
      );
    }
    return UserDto.fromEntity(user);
  }

  async findUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<[UserDto[], PageMetaDto]> {
    const { order, page, take } = pageOptionsDto;
    const skip = (page - 1) * take;
    const [users, itemCount] = await this.userRepository.customFindAndCount(
      take,
      skip,
      order,
    );

    const userDto = users.map((it) => {
      return UserDto.fromEntity(it);
    });
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return [userDto, pageMetaDto];
  }

  async updateNickname(
    id: number,
    updateUserNicknameInDto: UpdateUserNicknameInDto,
  ): Promise<UserDto> {
    await this.checkNickName(updateUserNicknameInDto.nickName);

    await this.userRepository.updateById(id, updateUserNicknameInDto);

    const user = await this.userRepository.findById(id);

    return UserDto.fromEntity(user);
  }

  async checkNickName(nickName: string) {
    const user = await this.userRepository.findByNickname(nickName);

    if (user) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_NICKNAME_ALREADY_USED,
        'USER_NICKNAME_ALREADY_USED',
      );
    }
  }

  async countByEmail(email: string) {
    const userCount = await this.userRepository.countByEmail(email);

    if (userCount) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_EMAIL_ALREADY_USED,
        'USER_EMAIL_ALREADY_USED',
      );
    }
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.userRepository.softDeleteById(id);

    if (!deleteResult.affected) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_DELETE_FAILED,
        'USER_DELETE_FAILED',
      );
    }

    return true;
  }
}
