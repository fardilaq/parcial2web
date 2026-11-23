import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtAuth } from './jwt.auth.js';
import { AdminPolicy } from './policies/admin.policy.js';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuth, AdminPolicy],
})
export class AuthModule {}