import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User> {
    console.log('Handler is running');
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User with given id not found');

    return user;
  }

  @Get()
  findAllByEmail(@Query('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Patch(':id')
  updateById(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  removeById(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
