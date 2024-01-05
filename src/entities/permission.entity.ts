import { Role } from "@prisma/client";
import { Exclude } from "class-transformer";

export class Permission {
  id: number
  role: Role

  @Exclude()
  companyId:number

  @Exclude()
  userId: number 

  constructor(data: Permission) {
    const { id, role, companyId, userId } = data;
    Object.assign(this, {id, role, companyId, userId});
  }
}