import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./performer.country";

@Entity()
export class Performer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    genre: string;

    @Column()
    country: Country;

    @Column()
    image: string;
}