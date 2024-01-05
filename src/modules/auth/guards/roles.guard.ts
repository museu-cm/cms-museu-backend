import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { PermissionRepository } from "src/repositories/permission.repository";
import { UsersRepository } from "src/repositories/users.repository";
import { AuthPayload } from "../dtos/auth-payload.dto";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersRepository: UsersRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    const authPayload = context.switchToHttp().getRequest().user as AuthPayload;

    const user = await this.usersRepository.findByPk(authPayload.id);

    if(!user)  return false;

    if (!requireRoles || !! user.isAdmin) {
      return true;
    }

    const permissions = await this.permissionRepository.findByUserId(user.id);
    const userRoles: Role[] = permissions.map( permission => permission.role );

    return requireRoles.some((role) => userRoles.includes(role));
  }
}