import { ExcludeBaseTimeDto } from '@libs/dao/base/time/dto/exclude-base-time.dto';
import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class UserDto extends ExcludeBaseTimeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nid: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  gameDbId: number;
  @ApiProperty()
  blockType: boolean;

  constructor(partial?: Partial<UserDto>) {
    super();
    Object.assign(this, partial);
  }
  public static fromEntity<User>(user: User): UserDto {
    return plainToInstance(UserDto, instanceToPlain(user));
  }
}
