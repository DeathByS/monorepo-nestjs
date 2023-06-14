import { Injectable } from '@nestjs/common';
import { UserRepository } from '@libs/dao/common/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return 'user empty';
    } else {
      return 'user not empty';
    }
  }
}
