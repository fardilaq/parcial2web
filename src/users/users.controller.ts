import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { CurrentUser } from '@nestjs/authentication';
import { UsersService } from './users.service.js';
import { AssignRolesDto } from './dto/assign-roles.dto.js';
import { AdminPolicy } from '../auth/policies/admin.policy.js';
import { User } from './entities/user.entity.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Can.Anyone()
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles.map((r) => r.role_name),
    };
  }

  @Can(AdminPolicy, 'manage')
  @Get()
  async findAll() {
    const users = await this.usersService.findAllUsers();
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      roles: u.roles.map((r) => r.role_name),
    }));
  }

  @Can(AdminPolicy, 'manage')
  @Patch(':id/roles')
  async assignRoles(@Param('id') id: string, @Body() dto: AssignRolesDto) {
    await this.usersService.assignRoles(id, dto.roles);
    return { message: 'Roles asignados' };
  }
}