import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Performer } from 'src/performers/entities/performer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAlbumsDto } from './dtos/create-albums-dto';
import { UpdateAlbumsDto } from './dtos/update-albums-dto';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album) private readonly albumRepository: Repository<Album>,
        @InjectRepository(Performer) private readonly performerRepository: Repository<Performer> 
    ) {}

    public async GetAllAlbums(): Promise<Album[]> {
        return await this.albumRepository.find();
    }

    public async GetAlbumById(id: number): Promise<Album> {
        return await this.albumRepository.findOne({
            where: {
                id: id
            }
        });
    }

    // ЧТО ЭТО ЗА ДИЧЬ???
    public async GetAlbumsByPerformer(performerId: number): Promise<Album[]> {
        const performer = await this.performerRepository.findOne({
            where: {
                id: performerId
            }
        });

        return await this.albumRepository.find({
            where: {
                performer: performer
            }
        });
    }
 
    public async GetAlbumByTitle(title: string): Promise<Album> {
        return await this.albumRepository.findOne({
            where: {
                title: title
            }
        });
    }

    public async GetAlbumsByYear(year: number): Promise<Album[]> {
        return await this.albumRepository.find({
            where: {
                year: year
            }
        });
    }
   
    // Тестовое создание альбома
    public async AddAlbum(data: CreateAlbumsDto): Promise<Album> {
        const performer = await this.performerRepository.findOne({
            where: {
                id: data.performerId
            }
        });
        const album  = new Album();
        album.title = data.title;
        album.performer = performer;
        album.year = data.year;
        album.cover = data.cover;

        const newAlbum = this.albumRepository.create(album);
        await this.albumRepository.save(newAlbum);
        return newAlbum;
    }

    public async GetFavoritesAlbums(indexes: number[]): Promise<Album[]> {
        if (indexes.length == 0) return [];
        const albums = [];
        
        for (let i = 0; i < indexes.length; i++) {
            const album = await this.albumRepository.findOne({
                where: {
                    id: indexes[i]
                }
            });
            if (!album) continue;
            albums.push(album);
        }
        return albums;
    }

    public async DeleteAlbum(id: number): Promise<DeleteResult> {
        return await this.albumRepository.delete(id);
    }

    public async UpdateAlbumPartial(id: number, data: UpdateAlbumsDto): Promise<UpdateResult> {
        return await this.albumRepository.update(id, data);
    }

    public async UpdateAlbum(id: number, data: CreateAlbumsDto): Promise<UpdateResult> {
        return await this.albumRepository.update(id, data);
    }
}
