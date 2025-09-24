import { Module } from '@nestjs/common';
import { PerformersService } from './performers.service';
import { PerformersController } from './performers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Performer } from './entities/performer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Performer])],
  controllers: [PerformersController],
  providers: [PerformersService],
})
export class PerformersModule {}