import { Body, Controller, Post, Get, Delete, UsePipes, ValidationPipe, Param, Patch, Put } from '@nestjs/common';
import { PerformersService } from './performers.service';
import { CreatePerformersDto } from './dtos/create-performers-dto';
import { Performer } from './entities/performer.entity';
import { Country } from './entities/performer.country';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePerformersDto } from './dtos/update-performers-dto';



@Controller('/performers')
export class PerformersController {
  constructor(private readonly performersService: PerformersService) {}

  @Get('/all')
  public async GetAllPerformers(): Promise<Performer[]> {
    return await this.performersService.GetAllPerformers();
  }

  @Get('/favorites/:indexes')
  public async GetFavoritesPerformers(@Param('indexes') indexes: string): Promise<Performer[]> {
     const ids: number[] = JSON.parse(indexes);
     return await this.performersService.GetFavoritesPerformers(ids);
  }

  @Get('/id/:id')
  public async GetPerformerById(@Param('id') id: number): Promise<Performer> {
    return await this.performersService.GetPerformerById(id);
  }

  @Get('/name/:name')
  public async GetPerformerByName(@Param('name') name: string): Promise<Performer> {
    return await this.performersService.GetPerformerByName(name);
  }

  @Get('/country/:country')
  public async GetPerformersByCountry(@Param('country') country: Country): Promise<Performer[]> {
    return await this.performersService.GetPerformersByCountry(country);
  }

  @Get('/genre/:genre')
  public async GetPerformersByGenre(@Param('genre') genre: string): Promise<Performer[]> {
    return await this.performersService.GetPerformersByGenre(genre);
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  public async AddPerformer(@Body() createPerformerDto: CreatePerformersDto): Promise<Performer> {
    return await this.performersService.AddPerformer(createPerformerDto);
  }

  @Delete('/:id')
  public async DeletePerformer(@Param('id') id: number): Promise<DeleteResult> {
    return await this.performersService.DeletePerformerById(id);
  }

  @Patch('/:id')
  public async UpdatePerformerPartial(@Param('id') id: number, @Body() updatePerformerPartialDto: UpdatePerformersDto): Promise<UpdateResult> {
    return await this.performersService.UpdatePerformerPartial(id, updatePerformerPartialDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  public async UpdatePerformer(@Param('id') id: number, @Body() createPerformerDto: CreatePerformersDto): Promise<UpdateResult> {
    return await this.performersService.UpdatePerformer(id, createPerformerDto);
  }
}