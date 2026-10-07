import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import { AuthGuard } from './auth.guard.js';

@Module({
  imports: [UsersService],
  exports: [AuthGuard],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
