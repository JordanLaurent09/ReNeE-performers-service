import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntArrayPipe implements PipeTransform<string, number[]> {
    transform(value: string, metadata: ArgumentMetadata): number[] {
        try {
            const val: number[] = JSON.parse(value);
            return val;
        } catch {
            throw new BadRequestException('Validation failed');
        }  
    }
}