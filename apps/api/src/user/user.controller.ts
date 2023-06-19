import { Controller, Param, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@libs/dao/common/user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { PageOptionsDto } from '@libs/common/pagination/dto/page-options.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiResponseEntity({
    type: UserDto,
    summary: '모든 유저 정보 with Pagination',
    isPagination: true,
  })
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<ResponseEntity<UserDto[]>> {
    const [userDto, pageMetaDto] = await this.userService.getUsers(
      pageOptionsDto,
    );

    return new ResponseEntity<UserDto[]>()
      .ok()
      .body(userDto)
      .setPageMeta(pageMetaDto);
  }

  @Get('/:id')
  @ApiResponseEntity({ type: UserDto, summary: '유저 찾기 by id' })
  async getUser(@Param('id') id: number): Promise<ResponseEntity<UserDto>> {
    const userDto = await this.userService.getUserById(id);
    return new ResponseEntity<UserDto>().ok().body(userDto);
  }
}
