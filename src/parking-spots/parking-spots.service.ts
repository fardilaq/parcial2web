import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto.js';
import { UpdateParkingSpotDto } from './dto/update-parking-spot.dto.js';
import { ParkingSpot } from './entities/parking-spot.entity.js';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service.js';
@Injectable()
export class ParkingSpotsService {

  constructor(
    @InjectRepository(ParkingSpot)
    private readonly parkingSpotRepository: Repository<ParkingSpot>,
    private readonly userService: UsersService
  ) {}
  async create(dto: CreateParkingSpotDto,user_id: string): Promise<ParkingSpot> {
    const user = await this.userService.findOne(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    const user_roles = user.roles;
    if (user_roles.some((role: unknown) => role === 'supervisor')) {
    } else {
      throw new Error('User is not authorized to create parking spots');
    }
    const parkingSpot = this.parkingSpotRepository.create();
    Object.assign(parkingSpot, dto, { user_id });
    return this.parkingSpotRepository.save(parkingSpot);
    
  }

}
