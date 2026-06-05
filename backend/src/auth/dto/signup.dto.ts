import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum
} from 'class-validator';
import { role } from 'src/role/enum/role.enum';



export class SignupDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(role)
  role:role;
}