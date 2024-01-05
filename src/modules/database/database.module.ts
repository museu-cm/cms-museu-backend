import { Module } from '@nestjs/common';
import { CompanyRepository } from 'src/repositories/company.repository';
import { PermissionRepository } from 'src/repositories/permission.repository';
import { UsersRepository } from 'src/repositories/users.repository';
import { PrismaPermissionRepository } from './prisma/prisma-permission.repository';
import { PrismaUsersRepository } from './prisma/prisma-user.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService, 
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: PermissionRepository,
      useClass: PrismaPermissionRepository
    },
    {
      provide: CompanyRepository,
      useClass: PrismaPermissionRepository
    }
  ],
  exports: [
    PrismaService, 
    UsersRepository,
    PermissionRepository,
    CompanyRepository
  ]
})
export class DatabaseModule { }
