import { BaseDto } from '@libs/dao/base/base.dto';
import { Exclude } from 'class-transformer';

export class ExcludeBaseTimeDto extends BaseDto {
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  deletedAt: Date;
}