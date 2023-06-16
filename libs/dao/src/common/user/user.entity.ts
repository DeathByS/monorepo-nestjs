import { BaseTimeEntity } from '@libs/dao/base/time/base-time.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nid: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ default: 0 })
  gameDbId: number;

  @Column({ default: false })
  blockType: boolean;

  // constructor(partial?: Partial<User>) {
  //   super();
  // }
}
