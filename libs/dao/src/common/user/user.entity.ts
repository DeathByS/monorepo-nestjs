import { BaseTimeEntity } from '@libs/dao/base/time/base-time.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Entity('user')
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_NID', { unique: true})
  @Column()
  nid: string;

  @Index('IDX_EMAIL', { unique: true })
  @Column()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ default: 0 })
  gameDbId: number;

  @Column({ default: false })
  blockType: boolean;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  @BeforeInsert()
  async hashNid() {
    try {
      this.nid = randomUUID();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
