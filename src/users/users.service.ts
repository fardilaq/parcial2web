import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHasher } from '@nestjs/authentication';
import { User } from './entities/user.entity.js';
import { RegisterDto } from '../auth/dto/register.dto.js';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { RolesService } from '../roles/roles.service.js';

@Injectable()
export class UsersService {
  findOne(user_id: string) {
    return this.usersRepo.findOne({
      where: { id: user_id },
      relations: { roles: true },
    });

  }
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly hasher: PasswordHasher,
    private readonly rolesService: RolesService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const exists = await this.usersRepo.existsBy({ email: dto.email });
    if (exists) {
      throw new ConflictException('Email ya registrado');
    }

    const password = await this.hasher.hash(dto.password);

    const user = this.usersRepo.create({
      email: dto.email,
      password,
      name: dto.name,
      phone: dto.phone,
    });

    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email },
      relations: { roles: true },
    });
  }

  async verifyCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    const valid = await this.hasher.verify(password, user?.password);
    return user && valid ? user : null;
  }

  async findById(id: string): Promise<User | null> {
  return this.usersRepo.findOne({
    where: { id },
    relations: { roles: true },
  });
}

 async assignRoles(userId: string, roleNames: string[]): Promise<void> {
  const user = await this.usersRepo.findOne({
    where: { id: userId },
    relations: { roles: true },
  });
  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }

  const roles = await this.rolesService.findByNames(roleNames);
  if (roles.length !== roleNames.length) {
    throw new BadRequestException('roles inválidos');
  }

  user.roles = roles;
  await this.usersRepo.save(user);
}
  findAllUsers(): Promise<User[]> {
  return this.usersRepo.find({ relations: { roles: true } });
}
  deleteById(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('ID no proporcionado');
    }
    return this.usersRepo.delete(id).then(() => {});
  }
}