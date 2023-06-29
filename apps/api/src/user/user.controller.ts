import {
  Controller,
  Param,
  Get,
  Query,
  Put,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@libs/dao/common/user/user.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserDto } from '@libs/dao/common/user/dto/user.dto';
import { ResponseEntity } from '@libs/common/network/response-entity';
import { ApiResponseEntity } from '@libs/common/decorator/api-response-entity.decorator';
import { PageOptionsDto } from '@libs/common/pagination/dto/page-options.dto';
import { UpdateUserNicknameInDto } from './dto/update-user-nickname-in.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiSecurity('apiKey')
@UseGuards(AuthGuard('apiKey'))
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
    const [userDto, pageMetaDto] = await this.userService.findUsers(
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
    const userDto = await this.userService.findById(id);
    return new ResponseEntity<UserDto>().ok().body(userDto);
  }

  @Get('/nid/:nid')
  @ApiResponseEntity({ type: UserDto, summary: '유저 찾기 by nid' })
  async getUserByNid(
    @Param('nid') nid: string,
  ): Promise<ResponseEntity<UserDto>> {
    const userDto = await this.userService.findByNid(nid);
    return new ResponseEntity<UserDto>().ok().body(userDto);
  }

  @Put('/:id/nickname')
  @ApiResponseEntity({ type: UserDto, summary: '유저 닉네임 수정' })
  async updateUserNickName(
    @Param('id') id: number,
    @Body() updateUserNicknameInDto: UpdateUserNicknameInDto,
  ): Promise<ResponseEntity<UserDto>> {
    const userDto = await this.userService.updateNickname(
      id,
      updateUserNicknameInDto,
    );
    return new ResponseEntity<UserDto>().ok().body(userDto);
  }

  @Delete('/:id')
  @ApiResponseEntity()
  async deleteUser(@Param('id') id: number) {
    const result = await this.userService.delete(id);
    return new ResponseEntity<boolean>().ok().body(result);
  }
}
