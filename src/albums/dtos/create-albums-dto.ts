import { IsString, IsNumber } from "class-validator";

export class CreateAlbumsDto {

    @IsString()
    title: string;

    @IsNumber()
    performerId: number;
    //performer: Performer;
    /* @IsString()
    performerName: string; */

    @IsNumber()
    year: number;

    @IsString()
    cover: string;

}