import { Exclude } from "class-transformer"
import { IsEmail, MinLength } from "class-validator"
import { Permission } from "./permission.entity"

export class User {
  id: number
  
  @MinLength(2)
  name: string

  @IsEmail()
  email: string

  @Exclude()
  @MinLength(8)
  password: string

  isAdmin: boolean

  permissions: Permission[]

  constructor(data: User) {
    const { id, name, email, password, isAdmin, permissions } = data;
    Object.assign(this, {id, name, email, password, isAdmin, permissions});
  }
}