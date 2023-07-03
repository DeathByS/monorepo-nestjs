import { ApiProperty } from '@nestjs/swagger';

export class SignInOutDto {
  @ApiProperty()
  accessToken: string;

  public setAccessToken(token: string): this {
    this.accessToken = token;
    return this;
  }
  // constructor(partial: Partial<SignInOutDto>) {
  //   Object.assign(this, partial);
  // }
  static of() {
    return new SignInOutDto();
  }
}
