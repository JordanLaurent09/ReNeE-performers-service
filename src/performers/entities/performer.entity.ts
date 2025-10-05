import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Album } from "src/albums/entities/album.entity";
import { Song } from "src/songs/entities/song.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Performer {

    @ApiProperty({ example: 1, description: 'ID исполнителя' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Muse', description: 'Имя исполнителя/Название группы' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Pop', description: 'Музыкальный жанр' })
    @Column()
    genre: string;

    @ApiProperty({ example: 'Russia', description: 'Страна исполнителя' })
    @Column()
    country: string;

    @ApiProperty({ example: [], description: 'Песни исполнителя' })
    @OneToMany(() => Song, song => song.performer)
    songs: Song[];

    @ApiProperty({ example: [], description: 'Альбомы исполнителя' })
    @OneToMany(() => Album, album => album.performer)
    albums: Album[];

    @ApiProperty({ example: 'some image', description: 'Фотография исполнителя/группы' })
    @Column({ type: 'mediumtext' })
    image: string;
}