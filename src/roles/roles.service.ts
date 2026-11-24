import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    const exists = await this.rolesRepo.existsBy({ role_name: dto.role_name });
    if (exists) {
      throw new ConflictException('role_name ya existe');
    }

    const role = this.rolesRepo.create({
      role_name: dto.role_name,
      description: dto.description ?? null,
    });

    return this.rolesRepo.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepo.find();
  }

  findByNames(names: string[]): Promise<Role[]> {
    return this.rolesRepo.findBy({ role_name: In(names) });
  }

  async deleteById(id: string): Promise<void> {
    if (!id) {
      throw new ConflictException('ID no proporcionado');
    }
    const userWithRole = await this.usersRepo.findOne({ where: { roles: { id } } });
    if (userWithRole) {
      throw new ConflictException('El rol está asignado a un usuario y no se puede eliminar');
    }
    return this.rolesRepo.delete(id).then(() => {});
  }
}