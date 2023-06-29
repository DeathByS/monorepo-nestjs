import { ApiProperty } from '@nestjs/swagger';
import { User } from '@libs/dao/common/user/user.entity';
import { Expose, instanceToPlain, plainToInstance } from "class-transformer";

export class SignUpOutDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  nickName: string;

  constructor(partial?: Partial<SignUpOutDto>) {
    Object.assign(this, partial);
  }

  static fromEntity(user: User): SignUpOutDto {
    return plainToInstance(SignUpOutDto, instanceToPlain(user), {
      excludeExtraneousValues: true,
    });
  }
}
