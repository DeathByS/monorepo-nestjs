import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserNicknameInDto {
  @ApiProperty()
  @IsString()
  nickName: string;
}
