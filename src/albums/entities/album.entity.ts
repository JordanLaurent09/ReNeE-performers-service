import { Performer } from "src/performers/entities/performer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Album {

    @ApiProperty({ example: 1, description: 'ID альбома' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Golden Hits', description: 'Название альбома' })
    @Column()
    title: string;

    @ManyToOne(() => Performer, performer => performer.albums)
    performer: Performer;    
    
    @ApiProperty({ example: 1992, description: 'Год выпуска альбома' })
    @Column()
    year: number;

    @ApiProperty({ example: 'album cover image', description: 'Название альбома' })
    @Column({ type: 'mediumtext' })
    cover: string; 

}