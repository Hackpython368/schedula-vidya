import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [AuthModule, UserModule, PatientModule, DoctorModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "123",
      database: 'test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
