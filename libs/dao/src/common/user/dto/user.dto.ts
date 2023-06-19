import { ExcludeBaseTimeDto } from '@libs/dao/base/time/dto/exclude-base-time.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@libs/dao/common/user/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class UserDto extends ExcludeBaseTimeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nid: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  gameDbId: number;
  @ApiProperty()
  blockType: boolean;

  public static fromEntity<User>(user: User): UserDto {
    return plainToInstance(UserDto, instanceToPlain(user));
  }
}
