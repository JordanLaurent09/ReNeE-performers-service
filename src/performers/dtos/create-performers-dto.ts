import { IsEnum, IsString } from "class-validator";
import { Country } from "../entities/performer.country";

export class CreatePerformersDto {

    @IsString()
    name: string;

    genre: string;

    @IsEnum(Country)
    country: Country;

    @IsString()
    image: string;
}
