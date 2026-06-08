import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column()
  specialization!: string;

  @Column()
  experience!: number;

  @Column()
  qualification!: string;

  @Column('decimal')
  consultationFees!: number;
}