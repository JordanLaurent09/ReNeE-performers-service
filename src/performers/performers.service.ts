import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Performer } from './entities/performer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePerformersDto } from './dtos/create-performers-dto';
import { UpdatePerformersDto } from './dtos/update-performers-dto';


@Injectable()
export class PerformersService {
    constructor(
        @InjectRepository(Performer) private readonly performerRepository: Repository<Performer>,
    ) { }

    public async GetAllPerformers(): Promise<Performer[]> {
        return this.performerRepository.find();
    }

    public async AddPerformer(data: CreatePerformersDto): Promise<Performer> {
        const newPerformer = this.performerRepository.create(data);
        this.performerRepository.save(newPerformer);
        return newPerformer;
    }

    public async GetFavoritesPerformers(indexes: number[]): Promise<Performer[]> {
        if (indexes.length == 0) return [];
        const performers = [];
        
        for (let i = 0; i < indexes.length; i++) {
            const performer = await this.performerRepository.findOne({
                where: {
                    id: indexes[i]
                }
            });
            if (!performer) continue;
            performers.push(performer);
        }
        return performers;
    }

    public async GetPerformerById(id: number): Promise<Performer> {
        return await this.performerRepository.findOne({
            where: {
                id: id
            }
        });
    }

    public async GetPerformerByName(name: string): Promise<Performer> {
        const performer = await this.performerRepository.findOne({
            where: {
                name: name
            }
        });
        return performer;
    }

    public async GetPerformersByCountry(country: string): Promise<Performer[]> {
        return await this.performerRepository.findBy({
            country: country
        });
    }

    public async GetPerformersByGenre(genre: string): Promise<Performer[]> {
        return await this.performerRepository.findBy({
            genre: genre
        });
    }

    // Получение альбомов и песен исполнителя
    /* public async GetPerformersAlbums(performerId: number): Promise<Album[]> {
        const performer = await this.performerRepository.findOne({
            where: {
                id: performerId
            }
        });

        return performer.albums;
    } */

    public async DeletePerformerById(id: number): Promise<DeleteResult> {
        return await this.performerRepository.delete(id);
    }

    public async UpdatePerformerPartial(id: number, data: UpdatePerformersDto): Promise<UpdateResult> {
        return await this.performerRepository.update(id, data);
    }

    public async UpdatePerformer(id: number, data: CreatePerformersDto): Promise<UpdateResult> {
        return await this.performerRepository.update(id, data);
    }
}
