import { Role, Situation } from "@prisma/client"
import { Exclude } from "class-transformer"
import { IsEmail, MinLength } from "class-validator"


export class User {
  id: number
  
  @MinLength(4, { message: 'Nome precisa ter pelo menos 4 caracteres' })
  name: string

  @MinLength(4, { message: 'Username precisa ter pelo menos 4 caracteres' })
  username: string

  @IsEmail({}, { message: 'Email inválido' })
  email: string

  @Exclude()
  @MinLength(8, { message: 'Senha precisa ter pelo menos 8 caracteres' })
  password: string

  role: Role

  situation: Situation

  constructor(data: User) {
    const { id, name, username, email, password, role, situation } = data;
    Object.assign(this, {id, name, username, email, password, role, situation});
  }
}