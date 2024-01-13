import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthPayload } from './dtos/auth-payload.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request): Promise<LoginResponseDto> {
    const transformedPayload: AuthPayload = request.user as AuthPayload;
    const accessToken = this.authService.generateJwtToken(transformedPayload);
    return new LoginResponseDto({ accessToken, userId: transformedPayload.id});
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-token')
  @HttpCode(200)
  jwt() {}
}

