import { Controller, Get, UseGuards, Request, Patch, Body, Req, Post, Query, Param } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DoctorService } from './doctor.service';
import { doctorData } from './Dto/doctor.dto';
import { DoctorFilterDto } from './Dto/doctor-filter.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly DoctorServices : DoctorService,){}

@Get()
getDoctorsBySpecialization(
  @Query('specialization')
  specialization?: string,
  @Query('search')
  search?: string,
) {
  if (specialization) {
  return this.DoctorServices.getDoctors(
    specialization,
  );
}
if (search) {
  return this.DoctorServices.getDoctorsByName(
    search,
  );
}else{
  return this.DoctorServices.listDoctor()
}
}


// @Get()
//   listDoctor() {
//     console.log("list doctor called")
//     return this.DoctorServices.listDoctor()
//   }
  
  
  @Get('profile')
  
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

@Roles('doctor')

profile(
  @Request() req,
) {
  
  return {
    message:
    'Doctor Profile',
    
    user:req.user
  };
}

@Get(':id')
getDoctorById(
  @Param('id') id: number,
) {
  return this.DoctorServices.getDoctorById(id);
}


@Post('profile')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('doctor')
addprofile(
  @Request() req,
  @Body() Dto : doctorData
) {
  return this.DoctorServices.addDoctor(req.user.id,Dto)
}

@Patch('profile')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('doctor')
updateprofile(
  @Req() req,
  @Body() doctorData : doctorData){
    console.log(doctorData)
  return this.DoctorServices.updateProfile(req.user.id,doctorData)
}

}
