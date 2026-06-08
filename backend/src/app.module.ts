import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),AuthModule, UserModule, PatientModule, DoctorModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
