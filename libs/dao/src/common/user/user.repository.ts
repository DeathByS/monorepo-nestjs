import { DataSource, Repository } from 'typeorm';
import { User } from '@libs/dao/common/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async findById(id: number): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.id=:id', { id: id })
      .getOne();
  }
}
