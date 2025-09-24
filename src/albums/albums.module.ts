import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { PerformersService } from 'src/performers/performers.service';
import { Performer } from 'src/performers/entities/performer.entity';
import { PerformersController } from 'src/performers/performers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TypeOrmModule.forFeature([Performer])],
  controllers: [AlbumsController, PerformersController],
  providers: [AlbumsService, PerformersService],
})
export class AlbumsModule {}
