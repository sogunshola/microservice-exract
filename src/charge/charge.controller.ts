import { Controller } from '@nestjs/common';
import { ChargeService } from './charge.service';

@Controller()
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}
}
