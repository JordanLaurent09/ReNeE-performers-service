import { Performer } from "src/performers/entities/performer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Performer, performer => performer.albums)
    performer: Performer;    
    /* @Column()
    performerName: string; */

    @Column()
    year: number;

    @Column({ type: 'mediumtext' })
    cover: string; 

}