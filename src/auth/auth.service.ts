import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('SECRET_KEY'),
      });
    } catch (e) {
      Logger.error(`An error occurred while verify token: ${e}`);
      return false;
    }
  }
}
