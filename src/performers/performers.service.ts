import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Performer } from './entities/performer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerformersService {
    constructor(
        @InjectRepository(Performer)
        private readonly performerRepository: Repository<Performer>
    ) { }
}
