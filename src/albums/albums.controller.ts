import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { CreateAlbumsDto } from './dtos/create-albums-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateAlbumsDto } from './dtos/update-albums-dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('/all')
  public async GetAllAlbums(): Promise<Album[]> {
    return await this.albumsService.GetAllAlbums();
  }

  @Get('/favorites/:indexes')
  public async GetFavoritesAlbums(@Param('indexes') indexes: string): Promise<Album[]> {
    const ids: number[] = JSON.parse(indexes);
    return await this.albumsService.GetFavoritesAlbums(ids);
  }

  @Get('/id/:id')
  public async GetAlbumById(@Param('id') id: number): Promise<Album> {
    return await this.albumsService.GetAlbumById(id);
  }

  @Get('/title/:title')
  public async GetAlbumByTitle(@Param('title') title: string): Promise<Album> {
    return await this.albumsService.GetAlbumByTitle(title);
  }

  @Get('/performer/:performerId')
  public async GetAlbumsByPerformer(@Param('performerId') performerId: number): Promise<Album[]> {
    return await this.albumsService.GetAlbumsByPerformer(performerId)
  }


  @Get('/year/:year')
  public async GetAlbumsByYear(@Param('year') year: number): Promise<Album[]> {
    return await this.albumsService.GetAlbumsByYear(year);
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  public async AddAlbum(@Body() data: CreateAlbumsDto): Promise<Album> {
    return await this.albumsService.AddAlbum(data);
  }

  @Delete('/:id')
  public async DeleteAlbum(@Param('id') id: number): Promise<DeleteResult> {
    return await this.albumsService.DeleteAlbum(id);
  }

  @Patch('/:id')
  public async UpdateAlbumPartial(@Param('id') id: number, @Body() data: UpdateAlbumsDto): Promise<UpdateResult> {
    return await this.albumsService.UpdateAlbumPartial(id, data);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  public async UpdateAlbum(@Param('id') id: number, @Body() data: CreateAlbumsDto): Promise<UpdateResult> {
    return await this.albumsService.UpdateAlbum(id, data);
  }
}
