import { IsDate, IsString } from "class-validator";

export class PatientDto {
    @IsString()
    phoneNumber!: string;

    @IsString()
    gender!: string;
  
    @IsDate()
    dob!: Date;
}