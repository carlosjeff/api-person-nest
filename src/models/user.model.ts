import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserModel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    name: string;

    @Column({length: 225})
    email: string;

    @Column({length: 255})
    password: string;

    @Column({length: 25})
    role: string;
}