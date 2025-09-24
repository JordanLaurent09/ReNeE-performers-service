import { Performer } from "src/performers/entities/performer.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Performer, performer => performer.songs)
    performer: Performer;
    /* @Column()
    performer: string; */

    @Column()
    year: number;

    @Column()
    path: string;
}