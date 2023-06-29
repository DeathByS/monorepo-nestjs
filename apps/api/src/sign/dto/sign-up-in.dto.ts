import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/;
export class SignUpInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @Matches(passwordRegex, {
    message: '비밀번호 구성: 영문 대소문자, 숫자, 특수기호, 최소 10자 이상',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  nickName: string;
}
