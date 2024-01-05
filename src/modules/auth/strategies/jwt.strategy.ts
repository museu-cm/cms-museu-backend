import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from '../auth.constants';
import { AuthService } from '../auth.service';
import { AuthPayload } from '../dtos/auth-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.jwtSecret,
    });
  }

  async validate(payload: AuthPayload) {

    if(!payload.email || !payload.id) throw new UnauthorizedException();

    const validUser = await this.authService.verifyUser(payload.email);

    if(!validUser)   throw new UnauthorizedException();

    return payload;
  }
}