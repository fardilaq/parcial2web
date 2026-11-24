import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingSpotDto } from './create-parking-spot.dto.js';

export class UpdateParkingSpotDto extends PartialType(CreateParkingSpotDto) {}
