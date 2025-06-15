import { Module } from '@nestjs/common';
import { PerformersModule } from './performers/performers.module';

@Module({
  imports: [PerformersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
