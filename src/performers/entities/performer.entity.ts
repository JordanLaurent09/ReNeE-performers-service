import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Album } from "src/albums/entities/album.entity";
import { Song } from "src/songs/entities/song.entity";

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

    @OneToMany(() => Song, song => song.performer)
    songs: Song[];

    @OneToMany(() => Album, album => album.performer)
    albums: Album[];

    @Column({ type: 'mediumtext' })
    image: string;
}