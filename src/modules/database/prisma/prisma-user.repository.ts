import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UsersRepository } from "src/repositories/users.repository";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {

  constructor(private prismaService: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id }
    });
    return user ? new User(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    return user ? new User(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    return user ? new User(user) : null;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    var updatedUser = await this.prismaService.user.update({
      where: { id },
      data: data
    })

    return new User(updatedUser);
  }

  async create(data: CreateUserDto): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        role: data.role ?? "BASIC",
        situation: data.situation
      },
    })

    return new User(createdUser)
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(user => new User(user));
  }
}