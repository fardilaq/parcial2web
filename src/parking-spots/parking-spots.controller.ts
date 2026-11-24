import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkingSpotsService } from './parking-spots.service.js';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto.js';
import { AdminPolicy } from '../auth/policies/admin.policy.js';
import { Can } from '@nestjs/authorization';

@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Post()
  @Can(AdminPolicy, 'manage')
  create(@Body() createParkingSpotDto: CreateParkingSpotDto, @Body('user_id') user_id: string) {
    if (user_id)
    return this.parkingSpotsService.create(createParkingSpotDto, user_id);
  }

}
