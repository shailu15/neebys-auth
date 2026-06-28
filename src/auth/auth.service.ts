import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:
      JwtService,
  ) {}

  generateToken() {
    return this.jwtService.sign({
      sub: '1',
      name:
        'Shailu',
      email:
        'demo@neebys.com',
      client:
        'chatgpt-dev',
    });
  }

  verifyToken(
    token: string,
  ) {
    return this.jwtService.verify(
      token,
    );
  }
}