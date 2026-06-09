import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './Entities/doctor.entities';
import { doctorData } from './Dto/doctor.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(Doctor) private readonly doctorRepo : Repository<Doctor>){}


    async addDoctor(userId,Dto : doctorData) {
      const doctorexist = await this.doctorRepo.findOne({
        where : {
          user : {
            id : userId,
          }
        }
      })
      if (!doctorexist){
        const doctor = await this.doctorRepo.save({
          ...Dto ,
          user : {
            id : userId
          }
        })

        return {
          msg : "Profile Create Successfully !!!",
          profile_data : {
            doctor
          }
        }

        }else{
          return {
            msg : "Confilict User already exist!!!"
          }
        }


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
      msg : "Doctor profile doesn't exits!!!"
    }
  }

  Object.assign(doctor, dto);

  const doctor_created = await this.doctorRepo.save(doctor);

  return {
    msg : "Update patient Data successfully!!!",
    ...doctor_created,
    user : userId
  }
}

async listDoctor(){
  const doctor_list = await this.doctorRepo.find({
    relations : {
      user : true
    }
  })
  return doctor_list.map((doctor_list) => ({
    id : doctor_list.id,
    fullname : doctor_list.user.name,
    specialization : doctor_list.specialization,
    experience : doctor_list.experience,
    consultent_fee : doctor_list.consultationFees,
    availability : doctor_list.availability
  }))
}
}
