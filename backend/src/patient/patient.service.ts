import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './Entities/patient.entities';
import { Repository } from 'typeorm';
import { PatientDto } from './Dto/dto.patient';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PatientService {
    constructor(
  @InjectRepository(Patient)
  private readonly patientRepo: Repository<Patient>,
) {}


async updateProfile(
  userId: number,
  dto: PatientDto,
) {
  let patient = await this.patientRepo.findOne({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    }
  });

  if (!patient) {
    return {
      msg : "Patient profile doesn't exists!!!"
    }
  } else {
    Object.assign(patient, dto);
  }

  const patient_created = await this.patientRepo.save(patient);

  return {
    msg : "Update patient Data successfully!!!",
    ...patient_created,
    user : userId
  }
}

    async addPatient(req ,Dto : PatientDto) {
      const patientexist = await this.patientRepo.findOne({
        where : {
          user : {
            id : req.user.id,
          }
        }
      })
      if (!patientexist){
        const patient = await this.patientRepo.save({
          ...Dto ,
          user : {
            id : req.user.id
          }
        })

        return {
          msg : "Profile Create Successfully !!!",
          profile_data : {
            patient
          }
        }

        }else{
          return {
            msg : "Confilict User already exist!!!"
          }
        }


      }
    

}
