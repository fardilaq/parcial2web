import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { Can } from '@nestjs/authorization';
import { CurrentUser } from '@nestjs/authentication';
import { User } from '../users/entities/user.entity.js';
import { ConductorPolicy } from '../auth/policies/conductor.policy.js';
import { SupervisorPolicy } from '../auth/policies/supervisor.policy.js';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Can(ConductorPolicy,'manage_conductor')
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }
  @Can(SupervisorPolicy,'manage_supervisor')
  @Patch(':id/state')
  updateState(@Param('id') id: string, @Body('state') state: string) {
    return this.reservationsService.updateState(+id, state as Parameters<ReservationsService['updateState']>[1]);
  }


  @Can.Anyone()
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Can(ConductorPolicy,'manage_conductor')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}

