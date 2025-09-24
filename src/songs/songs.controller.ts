import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
import { CreateSongsDto } from './dtos/create-songs-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongsDto } from './dtos/update-songs-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { Express } from 'express';

const storage = diskStorage({
  destination: './uploads/music',
  filename: (req, file, cb) => {
    const name = basename(file.originalname, extname(file.originalname));
    const ext = extname(file.originalname);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
})


@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/all')
  public async GetSongs(): Promise<Song[]> {
    return await this.songsService.GetAllSongs();
  }

  @Get('/id/:id')
  public async GetSongById(@Param('id') id: number): Promise<Song> {
    return await this.songsService.GetSongById(id);
  }

  @Get('/title/:title')
  public async GetSongsByTitle(@Param('title') title: string): Promise<[Song[], number]> {
    return await this.songsService.GetSongsByTitle(title);
  }

  @Get('/performer/:performerId')
  public async GetSongsByPerformer(@Param('performerId') performerId: number): Promise<Song[]> {
    return await this.songsService.GetSongsByPerformer(performerId);
  } 


  @Get('/year/:year')
  public async GetSongsByYear(@Param('year') year: number): Promise<Song[]> {
    return await this.songsService.GetSongsByYear(year);
  }


  @Post('/add')
  @UseInterceptors(FileInterceptor('file', {
    storage,
    limits: {fileSize: 50 * 50 * 1024},
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file type'), false);
      }
    },
  }),
)
  @UsePipes(new ValidationPipe())
  public async AddSong(@UploadedFile() file: Express.Multer.File, @Body() data: CreateSongsDto): Promise<Song> {
    console.log("Это переданные данные");
    console.log(data);
    const result = {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      title: data.title,
      performerId: data.performerId,
      year: data.year,
      path: data.path
    }
    console.log(result);
    data.path = file.path;
    return await this.songsService.AddSong(data);
  }

  @Delete('/:id')
  public async DeleteSong(@Param('id') id: number): Promise<DeleteResult> {
    return await this.songsService.DeleteSong(id);
  }

  @Patch('/:id')
  public async UpdateSongPartial(@Param('id') id: number, @Body() data: UpdateSongsDto): Promise<UpdateResult> {
    const updatedData = {
      title: data.title,
      performerId: Number(data.performerId),
      year: Number(data.year),
      path: data.path
    }
    return await this.songsService.UpdateSongPartial(id, updatedData);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  public async UpdateSong(@Param('id') id: number, @Body() data: CreateSongsDto): Promise<UpdateResult> {
    const updatedData = {
      title: data.title,
      performerId: Number(data.performerId),
      year: Number(data.year),
      path: data.path
    }
    return await this.songsService.UpdateSong(id, updatedData);
  }

}
