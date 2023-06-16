import { Controller, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@libs/dao/common/user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @ApiResponseEntity({ type: UserDto, summary: '유저 찾기 by id' })
  async getUser(@Param('id') id: number): Promise<ResponseEntity<UserDto>> {
    const userDto = await this.userService.getUserById(id);
    const responseEntity = new ResponseEntity<UserDto>().ok().body(userDto);
    return responseEntity;
  }
}
