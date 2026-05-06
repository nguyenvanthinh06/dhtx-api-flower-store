import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin-users.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController, AdminUsersController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
