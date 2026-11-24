import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import {Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity.js';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    
  ) {}
  create(createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepository.create(createReservationDto);
    return this.reservationRepository.save(reservation);
  }

  findAll() {
    return this.reservationRepository.find();
  }

  updateState(id: number, state: Reservation['status']) {
    return this.reservationRepository.update(id, { status: state });
  }
  
  remove(id: number) {
    return this.reservationRepository.delete(id);
  }



}
