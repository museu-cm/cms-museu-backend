import { PickType } from '@nestjs/mapped-types';
import { MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto extends PickType(
  User,
  ["name", "email"]
){
  @MinLength(8)
  password: string
}

