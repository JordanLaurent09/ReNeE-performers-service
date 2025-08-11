import { PartialType } from "@nestjs/mapped-types";
import { CreatePerformersDto } from "./create-performers-dto";

export class UpdatePerformersDto extends PartialType(CreatePerformersDto) {}