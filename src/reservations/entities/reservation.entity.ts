import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../users/entities/user.entity.js';
import { ParkingSpot } from '../../parking-spots/entities/parking-spot.entity.js';

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED"
}
export enum vehicle_max_charge {
  LOW = "STANDARD",
  MEDIUM = "FAST",
  HIGH = "ULTRA_FAST"
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  date: Date;

  @Column({nullable: false})
  vehicle_plate: string;

  @Column({nullable: false})
  vehicle_max_charge: vehicle_max_charge;


  @Column({nullable: false, default: ReservationStatus.PENDING})
  status: ReservationStatus;

  @CreateDateColumn({ type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, user => user.reservations)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => ParkingSpot, parkingSpot => parkingSpot.reservations)
  @JoinColumn({ name: 'parking_spot_id' })
  parking_spot: ParkingSpot;

}
