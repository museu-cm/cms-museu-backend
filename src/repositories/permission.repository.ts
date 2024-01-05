import { Permission } from "src/entities/permission.entity";

export abstract class PermissionRepository {
  abstract findByUserId(id: number): Promise<Permission[]>;
  abstract findByUserIdAndCompanyId(userId: number, companyId: number): Promise<Permission[]>;
}