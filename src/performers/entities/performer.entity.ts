import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Performer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genre: string;

    @Column()
    country: string;

    @Column()
    birthday: Date;
}