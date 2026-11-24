import { IsString } from "class-validator";

export class CreateParkingSpotDto {
    @IsString()
    code: string;
    @IsString()
    charger_type: 'STANDARD' | 'FAST' | 'ULTRA_FAST';

}
