import { IsString } from "class-validator";

export class CreatePerformersDto {

    @IsString()
    name: string;

    genre: string;

    @IsString()
    country: string;

    @IsString()
    image: string;
}