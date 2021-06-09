import { AbstractService } from './../shared/services/abstract-service.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService extends AbstractService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
  ) {
    super();
    this.repository = this.cardRepo;
  }

  async findByCardNumber(cardNumber: string) {
    const response = await this.cardRepo.findOne({
      where: {
        cardNumber,
      },
    });

    if (!response) {
      return false;
    }

    return response;
  }
}
