import { Body, Controller, Post, Get, Delete, UsePipes, ValidationPipe, Param, Patch, Put, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { PerformersService } from './performers.service';
import { CreatePerformersDto } from './dtos/create-performers-dto';
import { Performer } from './entities/performer.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePerformersDto } from './dtos/update-performers-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseIntArrayPipe } from './pipes/parseIntArrayPipe';


@ApiTags('performers')
@Controller('/performers')
export class PerformersController {
  constructor(private readonly performersService: PerformersService) {}

  @Get('/all')
  @ApiOperation({ summary: "Получение списка исполнителей" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Исполнители не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAllPerformers(): Promise<Performer[]> {
    try {
      const performers: Performer[] = await this.performersService.GetAllPerformers();
      return performers;
    }
    catch(error: any)
    {
      throw new InternalServerErrorException("Произошла ошибка сервера");
    }
  }
    
   

  @Get('/favorites/:indexes')
  @ApiOperation({ summary: "Получение списка избранных исполнителей пользователя" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Избранные исполнители не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetFavoritesPerformers(@Param('indexes', new ParseIntArrayPipe()) indexes: number[]): Promise<Performer[]> {
    
    try {
      const performers: Performer[] = await this.performersService.GetFavoritesPerformers(indexes);
      return performers;
    }
    catch(error: any) {
      return [];
    }  
  }

  @Get('/id/:id')
  @ApiOperation({ summary: "Получение исполнителя по идентификатору" })
  @ApiResponse({ status: 200, description: "Исполнитель успешно получен" })
  @ApiResponse({ status: 404, description: "Исполнитель не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetPerformerById(@Param('id', new ParseIntPipe()) id: number): Promise<Performer> {

    try {
      const performer: Performer = await this.performersService.GetPerformerById(id);
      if (performer) {
        return performer;
      }
      else return new Performer();
    }
    catch(error: any) {
      return new Performer();
    } 
  }

  @Get('/name/:name')
  @ApiOperation({ summary: "Получение исполнителя по имени/названию" })
  @ApiResponse({ status: 200, description: "Исполнитель успешно получен" })
  @ApiResponse({ status: 404, description: "Исполнитель не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetPerformerByName(@Param('name') name: string): Promise<Performer> {
    try {
      const performer: Performer = await this.performersService.GetPerformerByName(name);
      if (performer) {
        return performer;
      }
      else return new Performer();
    }
    catch(error: any) {
      return new Performer();
    }
  }

  @Get('/country/:country')
  @ApiOperation({ summary: "Получение исполнителей по стране" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Исполнители не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetPerformersByCountry(@Param('country') country: string): Promise<Performer[]> {
    try {
      const performers: Performer[] = await this.performersService.GetPerformersByCountry(country);
      if (performers) {
        return performers;
      }
      else return [];
    }
    catch(error: any) {
      return [];
    }
  }

  @Get('/genre/:genre')
  @ApiOperation({ summary: "Получение исполнителей по жанру" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Исполнители не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetPerformersByGenre(@Param('genre') genre: string): Promise<Performer[]> {
    try {
      const performers: Performer[] = await this.performersService.GetPerformersByGenre(genre);
      if (performers) {
        return performers;
      }
      else return [];
    }
    catch(error: any) {
      return [];
    }
  }

  @Post('/add')
  @ApiOperation({ summary: "Создание нового исполнителя" })
  @ApiResponse({ status: 201, description: "Исполнитель успешно создан", type: Performer })
  @ApiResponse({ status: 400, description: "Некорректные данные"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @UsePipes(new ValidationPipe())
  public async AddPerformer(@Body() createPerformerDto: CreatePerformersDto): Promise<Performer> {
    try {
      const newPerformer: Performer = await this.performersService.AddPerformer(createPerformerDto);
      if (newPerformer) {
        return newPerformer;
      }
      else return new Performer();     
    }
    catch(error: any) {
      return new Performer();
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: "Удаление исполнителя по ID" })
  @ApiResponse({ status: 200, description: "Исполнитель успешно удален" })
  @ApiResponse({ status: 404, description: "Исполнитель не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async DeletePerformer(@Param('id') id: number): Promise<DeleteResult> {
    const result: DeleteResult = await this.performersService.DeletePerformerById(id);
    return result;
  }

  @Patch('/:id')
  @ApiOperation({ summary: "Частичное обновление исполнителя" })
  @ApiResponse({ status: 200, description: "Исполнитель успешно обновлен частично" })
  @ApiResponse({ status: 404, description: "Исполнитель не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @UsePipes(new ValidationPipe())
  public async UpdatePerformerPartial(@Param('id') id: number, @Body() updatePerformerPartialDto: UpdatePerformersDto): Promise<UpdateResult> {
    const result: UpdateResult = await this.performersService.UpdatePerformerPartial(id, updatePerformerPartialDto);
    return result;
  }

  @Put('/:id')
  @ApiOperation({ summary: "Полное обновление исполнителя" })
  @ApiResponse({ status: 200, description: "Исполнитель успешно полностью обновлен" })
  @ApiResponse({ status: 404, description: "Исполнитель не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @UsePipes(new ValidationPipe())
  public async UpdatePerformer(@Param('id') id: number, @Body() createPerformerDto: CreatePerformersDto): Promise<UpdateResult> {
    const result: UpdateResult = await this.performersService.UpdatePerformer(id, createPerformerDto);
    return result;
  }
}