import { RedirectLink } from './entities/redirect-link.entity';
import { Injectable } from '@nestjs/common';
import { AbstractService } from '../shared/services/abstract-service.service';
import { CreateRedirectLinkDto } from './dto/create-redirect-link.dto';
import { UpdateRedirectLinkDto } from './dto/update-redirect-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedirectLinksService extends AbstractService {
  constructor(
    @InjectRepository(RedirectLink)
    private readonly redirectRepo: Repository<RedirectLink>,
  ) {
    super();
    this.repository = this.redirectRepo;
    this.name = 'redirect link';
  }
}
