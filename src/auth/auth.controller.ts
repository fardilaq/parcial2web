import {Body,Controller,HttpCode,HttpException,Post,UnauthorizedException} from '@nestjs/common';
import { Public, TokenService } from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshDto } from './dto/refresh.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.usersService.register(dto);
    return { message: 'Usuario registrado con éxito', userId: user.id };
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.usersService.verifyCredentials(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (!user.is_active) {
      throw new HttpException('Usuario desactivado', 423);
    }
    return this.tokenService.issue(user.id, { method: 'password' });
  }

  @Public()
  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.tokenService.refresh(dto.refreshToken);
  }
  @Public()
  @HttpCode(204)
  @Post('logout')
  async logout(@Body() dto: RefreshDto): Promise<void> {
    await this.tokenService.revoke(dto.refreshToken);
  }
}