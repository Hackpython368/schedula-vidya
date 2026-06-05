import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('patient')
export class PatientController {
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
}
