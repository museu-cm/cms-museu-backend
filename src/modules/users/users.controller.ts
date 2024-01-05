import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { HasRole } from 'src/common/decorators/has-role.decorator';
import { PageQuery } from 'src/common/http/page-query.type';
import { Page } from 'src/common/http/page.type';
import { IsId } from 'src/common/pipes/isId.pipe';
import { PageQueryPipe } from 'src/common/pipes/page-query-pipe.pipe';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HasRole(Role.ADMIN, Role.CREATE, Role.USERS_CREATE)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @HasRole(Role.ADMIN, Role.LIST, Role.USERS_LIST)
  async findAll(
    @Query(PageQueryPipe) query: PageQuery, 
  ): Promise<Page<User>> {
    console.log('Users FIND ALL: ', query.page)

    var users = await this.usersService.findAll();

    return new Page(users, 100);
  }

  @Get(':id')
  @HasRole(Role.ADMIN, Role.LIST, Role.USERS_LIST)
  async findOne(@Param('id', IsId) id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @HasRole(Role.ADMIN, Role.UPDATE, Role.USERS_UPDATE)
  async update(@Param('id', IsId) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HasRole(Role.ADMIN, Role.DELETE, Role.DELETE)
  remove(@Param('id', IsId) id: number) {
    return this.usersService.remove(id);
  }
}
