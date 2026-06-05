import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('doctor')
export class DoctorController {

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
}
