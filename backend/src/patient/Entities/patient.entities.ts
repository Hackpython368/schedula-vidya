import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column()
  phoneNumber!: string;

  @Column()
  gender!: string;

  @Column()
  dob!: Date;
}