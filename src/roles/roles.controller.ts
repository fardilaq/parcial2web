import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { RolesService } from './roles.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import {AdminPolicy} from '../auth/policies/admin.policy.js';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Can(AdminPolicy, 'manage')
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    const role = await this.rolesService.create(dto);
    return { message: 'Rol creado con éxito', roleId: role.id };
  }

  @Can(AdminPolicy, 'manage')
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Can(AdminPolicy, 'manage')
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.rolesService.deleteById(id);
    return { message: 'Rol eliminado con éxito' };
  }
}