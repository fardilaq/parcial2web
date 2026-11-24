import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { User } from '../../users/entities/user.entity.js';

enum ChargerType {
  STANDARD = "STANDARD",
  FAST = "FAST",
  ULTRA_FAST = "ULTRA_FAST"
}

@Entity('parking_spots')
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  charger_type: ChargerType;

  @CreateDateColumn({ type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Reservation, reservation => reservation.parking_spot)
  reservations: Reservation[];

  @ManyToOne(() => User, user => user.parking_spots)
  user: User;
}
