import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminUser } from '../../modules/auth/auth.types';

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AdminUser => {
    const request = ctx.switchToHttp().getRequest<{ admin: AdminUser }>();
    return request.admin;
  },
);
