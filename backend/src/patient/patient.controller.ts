import { Controller, Get, UseGuards, Request, Patch, Req, Body, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PatientDto } from './Dto/dto.patient';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService : PatientService){}
    @Get('profile')

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)

@Roles('patient')

profile(
  @Request() req,
) {

  return {
    message:
      'Patient Profile',

    user:req.user
  };
}

@Patch("profile")
@Roles('patient')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
updateProfile(
  @Req() req,
  @Body() dto: PatientDto,
) {
  return this.patientService.updateProfile(
    req.user.id,
    dto,
  );
}

@Post("profile")
@Roles('patient')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
addPatient(
  @Request() req,
  @Body() Dto : PatientDto
){
  return this.patientService.addPatient(req,Dto)
}
}
