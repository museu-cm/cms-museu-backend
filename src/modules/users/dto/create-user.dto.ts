import { PickType } from '@nestjs/mapped-types';
import { Role, Situation } from '@prisma/client';
import { MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends PickType(
  User,
  ["name", "username", "email", "password"]
){
  role?: Role
  situation?: Situation
}

