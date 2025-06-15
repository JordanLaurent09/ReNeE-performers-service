import { Controller } from '@nestjs/common';
import { PerformersService } from './performers.service';

@Controller('performers')
export class PerformersController {
  constructor(private readonly performersService: PerformersService) {}
}
