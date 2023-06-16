import { ApiProperty } from '@nestjs/swagger';

export class BaseTimeDto {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date;
}
