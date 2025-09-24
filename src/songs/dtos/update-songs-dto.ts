import { PartialType } from "@nestjs/mapped-types";
import { CreateSongsDto } from "./create-songs-dto";

export class UpdateSongsDto extends PartialType(CreateSongsDto) {}