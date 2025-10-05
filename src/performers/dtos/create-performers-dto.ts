import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePerformersDto {

    @ApiProperty({ example: 'Muse', description: 'Имя исполнителя/Название группы' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Pop', description: 'Музыкальный жанр' })
    @IsString()
    genre: string;

    @ApiProperty({ example: 'Russia', description: 'Страна исполнителя' })
    @IsString()
    country: string;

    @ApiProperty({ example: 'some image', description: 'Фотография исполнителя/группы' })
    @IsString()
    image: string;
}