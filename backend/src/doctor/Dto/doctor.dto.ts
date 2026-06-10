import { isNumber, IsNumber, IsString } from "class-validator";

export class doctorData {
    @IsString()
    specialization! : string;

    @IsNumber()
    experience! :number;

    @IsString()
    qualification! : string;

    @IsNumber()
    consultation_fee! : number;
    
}