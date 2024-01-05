import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from 'src/repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto)
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user: User | null = await this.usersRepository.findByPk(id);

    if(!user) throw new NotFoundException();

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const user: User | null = await this.usersRepository.findByPk(id);

    if(!user) throw new NotFoundException();

    if(updateUserDto.email){
      const thereIsNoAccountWithSameEmail = !!(await this.usersRepository.findByEmail(updateUserDto.email))

      if(thereIsNoAccountWithSameEmail) throw new BadRequestException("Alredy exists a user with same email");
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
