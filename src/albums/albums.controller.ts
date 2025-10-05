import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { CreateAlbumsDto } from './dtos/create-albums-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateAlbumsDto } from './dtos/update-albums-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('/all')
  @ApiOperation({ summary: "Получение списка альбомов" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Альбомы не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAllAlbums(): Promise<Album[]> {
    try {
      const albums: Album[] = await this.albumsService.GetAllAlbums();
      return albums;
    }
    catch (error: any) {
      return [];
    }
  }

  @Get('/favorites/:indexes')
  @ApiOperation({ summary: "Получение списка избранных альбомов пользователя" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Избранные альбомы не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetFavoritesAlbums(@Param('indexes') indexes: string): Promise<Album[]> {
    try {
      const ids: number[] = JSON.parse(indexes); 
      const albums: Album[] = await this.albumsService.GetFavoritesAlbums(ids);
      return albums;
    }
    catch (error: any) {
      return [];
    }
    
  }

  @Get('/id/:id')
  @ApiOperation({ summary: "Получение альбома по идентификатору" })
  @ApiResponse({ status: 200, description: "Альбом успешно получен" })
  @ApiResponse({ status: 404, description: "Альбом не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAlbumById(@Param('id') id: number): Promise<Album> {
    try {
      const album: Album = await this.albumsService.GetAlbumById(id);
      if (album) {
        return album;
      }
      else return new Album();
    }
    catch (error: any) {
      return new Album();
    }
  }

  @Get('/title/:title')
  @ApiOperation({ summary: "Получение альбома по названию" })
  @ApiResponse({ status: 200, description: "Альбом успешно получен" })
  @ApiResponse({ status: 404, description: "Альбом не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAlbumByTitle(@Param('title') title: string): Promise<Album> {
    try {
      const album: Album = await this.albumsService.GetAlbumByTitle(title);
      if (album) {
        return album;
      }
      else return new Album();
    }
    catch (error: any) {
      return new Album();
    }
  }

  @Get('/performer/:performerId')
  @ApiOperation({ summary: "Получение списка альбомов конкретного исполнителя" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Альбомы не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAlbumsByPerformer(@Param('performerId') performerId: number): Promise<Album[]> {
    try {
      const albums: Album[] = await this.albumsService.GetAlbumsByPerformer(performerId);
      return albums;
    }
    catch (error: any) {
      return [];
    }
  }


  @Get('/year/:year')
  @ApiOperation({ summary: "Получение списка альбомов по году издания" })
  @ApiResponse({ status: 200, description: "Список успешно получен" })
  @ApiResponse({ status: 404, description: "Альбомы не найдены"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async GetAlbumsByYear(@Param('year') year: number): Promise<Album[]> {

    try {
      const albums: Album[] = await this.albumsService.GetAlbumsByYear(year);
      return albums;
    }
    catch (error: any) {
      return [];
    }
  }

  @Post('/add')
  @ApiOperation({ summary: "Создание нового альбома" })
  @ApiResponse({ status: 201, description: "Альбом успешно создан", type: Album })
  @ApiResponse({ status: 400, description: "Некорректные данные"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @UsePipes(new ValidationPipe())
  public async AddAlbum(@Body() data: CreateAlbumsDto): Promise<Album> {
    try {
      const newAlbum: Album = await this.albumsService.AddAlbum(data);
      if (newAlbum) {
        return newAlbum;
      }
      else return new Album();
    }
    catch (error: any) {
      return new Album();
    } 
  }

  @Delete('/:id')
  @ApiOperation({ summary: "Удаление альбома по ID" })
  @ApiResponse({ status: 200, description: "Альбом успешно удален" })
  @ApiResponse({ status: 404, description: "Альбом не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async DeleteAlbum(@Param('id') id: number): Promise<DeleteResult> {
    const result: DeleteResult = await this.albumsService.DeleteAlbum(id);
    return result;
  }

  @Patch('/:id')
  @ApiOperation({ summary: "Частичное обновление альбома" })
  @ApiResponse({ status: 200, description: "Альбом успешно обновлен частично" })
  @ApiResponse({ status: 404, description: "Альбом не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  public async UpdateAlbumPartial(@Param('id') id: number, @Body() data: UpdateAlbumsDto): Promise<UpdateResult> {
    const result: UpdateResult = await this.albumsService.UpdateAlbumPartial(id, data);
    return result;
  }

  @Put('/:id')
  @ApiOperation({ summary: "Полное обновление альбома" })
  @ApiResponse({ status: 200, description: "Альбом успешно полностью обновлен" })
  @ApiResponse({ status: 404, description: "Альбом не найден"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @UsePipes(new ValidationPipe())
  public async UpdateAlbum(@Param('id') id: number, @Body() data: CreateAlbumsDto): Promise<UpdateResult> {
    const result: UpdateResult = await this.albumsService.UpdateAlbum(id, data);
    return result;
  }
}
