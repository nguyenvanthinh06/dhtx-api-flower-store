import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AdminUser } from './auth.types';

type AdminRequest = Request & { admin?: AdminUser };

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: AdminRequest, _res: Response, next: NextFunction): void {
    const authorization = req.headers.authorization;
    const token = authorization?.replace(/^Bearer\s+/i, '');
    req.admin = this.authService.validateToken(token);
    next();
  }
}
