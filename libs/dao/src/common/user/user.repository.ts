import { DataSource, DeleteResult, Repository } from 'typeorm';
import { User } from '@libs/dao/common/user/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InternalErrorCode } from '@libs/common/constants/internal-error-code.constants';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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

  async findByNid(nid: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.nid=:nid', { nid: nid })
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

  async updateById<Entity>(id: number, values: QueryDeepPartialEntity<Entity>) {
    const result = await this.createQueryBuilder('user')
      .update(User)
      .set(values)
      .where('user.id=:id', { id: id })
      .execute();

    if (!result.affected) {
      throw new InternalServerErrorException(
        InternalErrorCode.USER_UPDATE_FAIL,
        'USER_UPDATE_FAIL',
      );
    }
  }

  async findByNickname(nickName: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('user.nickName=:nickName', { nickName: nickName })
      .getOne();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.email=:email', { email: email })
      .getOne();
  }

  async countByEmail(email: string): Promise<number> {
    return await this.createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getCount();
  }

  async softDeleteById(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder('user')
      .softDelete()
      .from(User)
      .where('user.id=:id', { id: id })
      .execute();
  }
}
