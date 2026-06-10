import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './Entities/doctor.entities';
import { doctorData } from './Dto/doctor.dto';
import { User } from 'src/user/entities/user.entity';
import { DoctorFilterDto } from './Dto/doctor-filter.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>) { }


  async addDoctor(userId, Dto: doctorData) {
    const doctorexist = await this.doctorRepo.findOne({
      where: {
        user: {
          id: userId,
        }
      }
    })
    if (!doctorexist) {
      const doctor = await this.doctorRepo.save({
        ...Dto,
        user: {
          id: userId
        }
      })

      return {
        msg: "Profile Create Successfully !!!",
        profile_data: {
          doctor
        }
      }

    } else {
      return {
        msg: "Confilict User already exist!!!"
      }
    }


  }

  async getDoctors(
    specialization?: string,
  ) {
    let page = 1;
    let limit = 10;

    const query =
      this.doctorRepo.createQueryBuilder(
        'doctor',
      );

    query.leftJoinAndSelect(
      'doctor.user',
      'user',
    );
    console.log(specialization);
    query.andWhere(
      'LOWER(doctor.specialization) LIKE LOWER(:specialization)',
      {
        specialization: `%${specialization}%`,
      },
    );

    query.skip((page - 1) * limit);
    query.take(limit);

    const [doctors, total] =
      await query.getManyAndCount();

    return {
      data: {
        doctors: doctors.map((doctor) => ({
          ...doctor,
          user: { 
          name: doctor.user.name,
          email: doctor.user.email
          }
        }))
      },
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }

  async getDoctorsByName(
    search?: string,
  ) {

    let page = 1;
    let limit = 10;

    const query =
      this.doctorRepo.createQueryBuilder(
        'doctor',
      );

    query.leftJoinAndSelect(
      'doctor.user',
      'user',
    );
    console.log(search);
    query.andWhere(
      'LOWER(user.name) LIKE LOWER(:search)',
      {
        search: `%${search}%`,
      },
    );
    query.skip((page - 1) * limit);
    query.take(limit);

    const [doctors, total] =
      await query.getManyAndCount();

    return {
      data: {
        doctors: doctors.map((doctor) => ({
          ...doctor,
          user: {
            name: doctor.user.name,
            email: doctor.user.email
          }

        }))
      },
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }

  async getDoctorById(id) {
    const doctor_by_id = await this.doctorRepo.findOne({
      where: {
        id: id
      }
    })
    if (!doctor_by_id) {
      return {
        msg: "Doctor with id doesn't exist!!!"
      }
    }
    return doctor_by_id
  }

  async updateProfile(
    userId: number,
    dto: doctorData,
  ) {
    let doctor = await this.doctorRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!doctor) {
      return {
        msg: "Doctor profile doesn't exits!!!"
      }
    }

    Object.assign(doctor, dto);

    const doctor_created = await this.doctorRepo.save(doctor);

    return {
      msg: "Update patient Data successfully!!!",
      ...doctor_created,
      user: userId
    }
  }

  async listDoctor() {

    
    let page = 1;
    let limit = 10;
    
    const [doctors, total] = await this.doctorRepo.createQueryBuilder('doctor')
    .leftJoinAndSelect('doctor.user', 'user')
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

    return {
      data: {
        doctors: doctors.map((doctor) => ({
          ...doctor,
          user: {
            name: doctor.user.name,
            email: doctor.user.email
          }
          
        }))
      },
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }
  }
