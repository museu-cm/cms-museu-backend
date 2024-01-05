import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/repositories/users.repository';
import { AuthPayload } from './dtos/auth-payload.dto';

@Injectable()
export class AuthService {
   constructor(
      private usersRepository: UsersRepository,
      private jwtService: JwtService
   ) { }

   async validateUser(email: string, password: string): Promise<AuthPayload> {
      const user = await this.usersRepository.findByEmail(email);

      if (user && await bcrypt.compare(password, user.password)) {
         return {
            email: user.email,
            id: user.id
         };
      }

      throw new UnauthorizedException();
   }

   generateJwtToken(payload: AuthPayload): string {
      return this.jwtService.sign(payload);
   }

   async verifyUser(email: string): Promise<boolean> {
      const user = await this.usersRepository.findByEmail(email);
      if (user) return true;
      return false;
   }
}