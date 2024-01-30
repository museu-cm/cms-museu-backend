import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { User } from '@src/entities/user.entity';
import { UsersRepository } from '@src/repositories/users.repository';
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
      throw new NotAcceptableException("Já existe um usuário com este email");

    if(await this.usersRepository.findByUsername(createUserDto.username))
      throw new NotAcceptableException("Já existe um usuário com este username");


    const salt = process.env.SALT
    if(!salt) throw new InternalServerErrorException('Env error ao criar usuário')

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
      throw new NotAcceptableException("Já existe um usuário com este email");

    if(updateUserDto.username && await this.usersRepository.findByUsername(updateUserDto.username))
      throw new NotAcceptableException("Já existe um usuário com este username");

    if(updateUserDto.password){
      const salt = process.env.SALT
      if(!salt) throw new InternalServerErrorException('Env error ao criar usuário')

      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt)
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findById(id);

    if(!user) throw new NotFoundException("Usuário não encontrado");

    return await this.usersRepository.deleteById(id);
  }
}
