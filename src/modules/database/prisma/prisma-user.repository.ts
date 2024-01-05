import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UsersRepository } from "src/repositories/users.repository";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { PrismaService } from "./prisma.service";
import { Permission } from "src/entities/permission.entity";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {

  constructor(private prismaService: PrismaService) {}

  async findByPk(id: number): Promise<User | null> {
    const user = await this.prismaService.userTable.findFirst({
      where: { id },
      include: { permissions: true }
    });
    return user ? new User({
      ...user,
      permissions: user.permissions.map(p => new Permission(p))
    }) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.userTable.findFirst({
      where: { email },
      include: { permissions: true }
    });

    return user ? new User({
      ...user,
      permissions: user.permissions.map(p => new Permission(p))
    }) : null;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    var updatedUser = await this.prismaService.userTable.update({
      where: { id },
      include: { permissions: true },
      data: data
    })

    return new User({
      ...updatedUser,
      permissions: updatedUser.permissions.map( p => new Permission(p))
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const createdUser = await this.prismaService.userTable.create({
      data: data,
      include: { permissions: true }
    })

    return new User({
      ...createdUser,
      permissions: createdUser.permissions.map( p => new Permission(p))
    })
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prismaService.userTable.findMany({
      include: { permissions: true }
    });

    const users = prismaUsers.map(prismaUser => new User({
      ...prismaUser,
      permissions: prismaUser.permissions.map( p => new Permission(p))
    }));

    return users;
  }
}