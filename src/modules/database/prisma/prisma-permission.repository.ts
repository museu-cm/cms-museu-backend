import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PermissionRepository } from "src/repositories/permission.repository";
import { Permission } from "src/entities/permission.entity";
import { PermissionTable } from "@prisma/client";

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {

  constructor(private prismaService: PrismaService) {}

  async findByUserId(id: number): Promise<Permission[]> {
    const permissions: PermissionTable[] = await this.prismaService.permissionTable.findMany({
      where: { userId: id }
    });

    return permissions.map(data => new Permission(data));
  }

  async findByUserIdAndCompanyId(userId: number, companyId: number): Promise<Permission[]> {
    const permissions: PermissionTable[] = await this.prismaService.permissionTable.findMany({
      where: { userId, companyId }
    });

    return permissions.map(data => new Permission(data));
  }
}