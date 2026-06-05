import { role } from "src/role/enum/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column({
        type:'enum',
        enum: role,
    })
    role : role;
}