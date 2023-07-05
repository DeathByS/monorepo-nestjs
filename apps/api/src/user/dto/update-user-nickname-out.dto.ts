import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserNicknameOutDto {
  @ApiProperty()
  nickName: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  constructor(partial: Partial<UpdateUserNicknameOutDto>) {
    Object.assign(this, partial);
  }
}