import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Put, Req, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { HasRole } from '@src/common/decorators/has-role.decorator';
import { PageQuery } from '@src/common/http/page-query.type';
import { Page } from '@src/common/http/page.type';
import { IsId } from '@src/common/pipes/isId.pipe';
import { PageQueryPipe } from '@src/common/pipes/page-query-pipe.pipe';
import { User } from '@src/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthPayload } from '../auth/dtos/auth-payload.dto';


// @UseGuards(RolesGuard)
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', IsId) id: number): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @HasRole(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @HasRole(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', IsId) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', IsId) id: number, @Req() request: Request) {
    const authPayload: AuthPayload = (request as any).user

    if (!authPayload.id) throw new InternalServerErrorException('Auth payload Vazio') 

    if (Number(authPayload.id) == id) throw new BadRequestException('Usuário não pode ser removido')

    return this.usersService.remove(id);
  }

  @Get('/pages/page')
  async findAllPaginated(
    @Query(PageQueryPipe) query: PageQuery, 
  ): Promise<Page<User>> {
    var users = await this.usersService.findAll();
    return new Page(users, 100);
  }
}
