import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateSongsDto } from './dtos/update-songs-dto';
import { CreateSongsDto } from './dtos/create-songs-dto';
import { Performer } from 'src/performers/entities/performer.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private readonly songRepository: Repository<Song>,
        @InjectRepository(Performer) private readonly performerRepository: Repository<Performer>
    ){}

    public async GetAllSongs(): Promise<Song[]> {
        return await this.songRepository.find();
    }

    public async GetSongById(id: number): Promise<Song> {
        return await this.songRepository.findOne({
            where: {
                id: id
            }
        });
    }

    public async GetSongsByTitle(title: string): Promise<[Song[], number]> {
        return await this.songRepository.findAndCount({
            where: {
                title: title
            }
        });
    }

    public async GetSongsByPerformer(performerId: number): Promise<Song[]> {
        const performer = await this.performerRepository.findOne({
            where: {
                id: performerId
            }
        });
        
        return await this.songRepository.find({
            where: {
                performer: performer
            }
        });
    }


    public async GetSongsByYear(year: number): Promise<Song[]> {
        return await this.songRepository.find({
            where: {
                year: year
            }
        });
    }

    public async AddSong(data: CreateSongsDto): Promise<Song> {

        const performer = await this.performerRepository.findOne({
            where: {
                id: Number(data.performerId)
            }
        });

        const song = new Song();
        song.title = data.title;
        song.performer = performer;
        song.year = Number(data.year);
        song.path = data.path;

        const newSong: Song = this.songRepository.create(song);
        await this.songRepository.save(newSong);

        return newSong;
    }
    
    public async DeleteSong(id: number): Promise<DeleteResult> {
        return await this.songRepository.delete(id);
    }

    public async UpdateSongPartial(id: number, data: { title: string, performerId: number, year: number, path: string}): Promise<UpdateResult> {
        return await this.songRepository.update(id, data);
    }

    public async UpdateSong(id: number, data: { title: string, performerId: number, year: number, path: string}): Promise<UpdateResult> {
        return await this.songRepository.update(id, data);
    }
}
