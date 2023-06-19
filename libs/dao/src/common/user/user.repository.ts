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

  async customFindAndCount(
    take: number,
    skip: number,
    orderBy: 'ASC' | 'DESC',
  ): Promise<[User[], number]> {
    return await this.createQueryBuilder('user')
      .take(take)
      .skip(skip)
      .orderBy('user.id', orderBy)
      .getManyAndCount();
  }
}
