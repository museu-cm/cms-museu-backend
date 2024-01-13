import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from 'src/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {

    if(await this.usersRepository.findByEmail(createUserDto.email))
      throw new NotAcceptableException("There is already a user with this email");

    if(await this.usersRepository.findByUsername(createUserDto.username))
      throw new NotAcceptableException("There is already a user with this username");


    const salt = process.env.SALT
    if(!salt) throw new InternalServerErrorException('Env error on create user')

    createUserDto.password = await bcrypt.hash(createUserDto.password, salt)

    return await this.usersRepository.create(createUserDto)
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user: User | null = await this.usersRepository.findById(id);

    if(!user) throw new NotFoundException();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const user: User | null = await this.usersRepository.findById(id);

    if(!user) throw new NotFoundException();

    if(updateUserDto.email && await this.usersRepository.findByEmail(updateUserDto.email))
      throw new NotAcceptableException("There is already a user with this email");

    if(updateUserDto.username && await this.usersRepository.findByUsername(updateUserDto.username))
      throw new NotAcceptableException("There is already a user with this username");

    if(updateUserDto.password){
      const salt = process.env.SALT
      if(!salt) throw new InternalServerErrorException('Env error on create user')

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt)
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
