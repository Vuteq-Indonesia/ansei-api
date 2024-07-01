import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';
import { Roles } from '../decorators/roles.decorators';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const roles = this.reflector.get(Roles, context.getHandler());
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const isValid = await this.authService.verifyToken(token);
      if (!isValid) {
        return false;
      }
      request['user'] = isValid;
      request['accessToken'] = token;
    } catch (e) {
      return false;
    }
    if (roles) {
      const { user } = request;
      if (user['role'].includes('SUPER')) {
        return true;
      }
      if (user['role'].includes('ADMIN_ANSEI')) {
        return true;
      }
      const hasRole = roles.includes(user['role']);
      if (!hasRole) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
