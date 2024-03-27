import { Module } from '@nestjs/common';
import { UsersRepository } from '@src/repositories/users.repository';
import { PrismaUsersRepository } from './prisma/prisma-user.repository';
import { PrismaService } from './prisma/prisma.service';
import { ImageRepository } from '@src/repositories/image.repository';
import { PrismaImageRepository } from './prisma/prisma-image.repository';

@Module({
  providers: [
    PrismaService, 
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository
    }
  ],
  exports: [
    PrismaService, 
    UsersRepository,
    ImageRepository
  ]
})
export class DatabaseModule { }
