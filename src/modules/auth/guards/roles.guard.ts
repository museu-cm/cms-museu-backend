import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { UsersRepository } from "src/repositories/users.repository";
import { AuthPayload } from "../dtos/auth-payload.dto";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersRepository: UsersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    const authPayload = context.switchToHttp().getRequest().user as AuthPayload;

    const user = await this.usersRepository.findById(authPayload.id);

    if(!user)  return false;
    if (!requiredRoles) return true;

    return requiredRoles.some((role) => user.role == role);
  }
}