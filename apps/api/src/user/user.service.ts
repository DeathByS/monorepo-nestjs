import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '@libs/dao/common/user/user.repository';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { PageOptionsDto } from '@libs/common/pagination/dto/page-options.dto';
import { PageMetaDto } from '@libs/common/pagination/dto/page-meta.dto';

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

  async getUsers(
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
}
