import { User } from "src/entities/user.entity";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: number, data: UpdateUserDto): Promise<User>;
}