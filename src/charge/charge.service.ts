import { Charge } from './entities/charge.entity';
import { AbstractService } from './../shared/services/abstract-service.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChargeService extends AbstractService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepo: Repository<Charge>,
  ) {
    super();
    this.repository = this.chargeRepo;
  }
}
