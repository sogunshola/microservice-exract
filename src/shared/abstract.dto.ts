import { IsAlphanumeric } from 'class-validator';
import { AbstractEntity } from './abstract-entity';

export class AbstractDto {
  @IsAlphanumeric()
  readonly id: string;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
  }
}
