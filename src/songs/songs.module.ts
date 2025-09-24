import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Performer } from 'src/performers/entities/performer.entity';
import { PerformersService } from 'src/performers/performers.service';
import { PerformersController } from 'src/performers/performers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), TypeOrmModule.forFeature([Performer])],
  controllers: [SongsController, PerformersController],
  providers: [SongsService, PerformersService],
})
export class SongsModule {}
