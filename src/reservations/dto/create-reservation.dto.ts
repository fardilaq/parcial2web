import { IsString } from "class-validator";
import { vehicle_max_charge } from "../entities/reservation.entity.js";

export class CreateReservationDto {
    @IsString()
    user_id: string;
    @IsString()
    parking_spot_id: string;
    @IsString()
    date: Date;
    @IsString()
    vehicle_plate: string;
    @IsString()
    vehicle_max_charge: vehicle_max_charge;
}
