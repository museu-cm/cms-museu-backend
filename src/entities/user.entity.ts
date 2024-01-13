import { Role, Situation } from "@prisma/client"
import { Exclude } from "class-transformer"
import { IsEmail, MinLength } from "class-validator"


export class User {
  id: number
  
  @MinLength(4)
  name: string

  @MinLength(4)
  username: string

  @IsEmail()
  email: string

  @Exclude()
  @MinLength(8)
  password: string

  // @Exclude()
  role: Role

  situation: Situation

  constructor(data: User) {
    const { id, name, username, email, password, role, situation } = data;
    Object.assign(this, {id, name, username, email, password, role, situation});
  }
}