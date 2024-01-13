import { PickType } from '@nestjs/mapped-types';
import { Role, Situation } from '@prisma/client';
import { MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends PickType(
  User,
  ["name", "username", "email"]
){

  @MinLength(8)
  password: string
  
  role?: Role
  situation?: Situation
}

