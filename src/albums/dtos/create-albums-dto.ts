import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlbumsDto {

    @ApiProperty({ example: 'Golden Hits', description: 'Название альбома' })
    @IsString()
    title: string;

    @ApiProperty({ example: 1, description: 'ID исполнителя/группы' })
    @IsNumber()
    performerId: number;

    @ApiProperty({ example: 1992, description: 'Год выпуска альбома' })
    @IsNumber()
    year: number;

    @ApiProperty({ example: 'album cover image', description: 'Название альбома' })
    @IsString()
    cover: string;

}