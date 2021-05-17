import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @MessagePattern('createCard')
  create(@Payload() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @MessagePattern('findAllCards')
  findAll() {
    return this.cardsService.findAll();
  }

  @MessagePattern('findOneCard')
  findOne(@Payload() id: number) {
    return this.cardsService.findOne(id);
  }

  @MessagePattern('updateCard')
  update(@Payload() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(updateCardDto.id, updateCardDto);
  }

  @MessagePattern('removeCard')
  remove(@Payload() id: number) {
    return this.cardsService.remove(id);
  }
}
