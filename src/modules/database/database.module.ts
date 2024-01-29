import { Module } from '@nestjs/common';
import { UsersRepository } from '@src/repositories/users.repository';
import { PrismaUsersRepository } from './prisma/prisma-user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService, 
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
  ],
  exports: [
    PrismaService, 
    UsersRepository,
  ]
})
export class DatabaseModule { }
