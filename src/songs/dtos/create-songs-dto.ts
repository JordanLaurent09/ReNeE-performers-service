import { IsNumber, IsString } from "class-validator";

export class CreateSongsDto {
    @IsString()
    title: string;

    @IsString()
    performerId: string;
    
    @IsString()
    year: string;

    @IsString()
    path: string;
}