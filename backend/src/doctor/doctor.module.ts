import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './Entities/doctor.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
