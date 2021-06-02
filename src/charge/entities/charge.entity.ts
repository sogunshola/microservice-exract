import { Column, Entity, ManyToOne } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';
import { AbstractEntity } from '../../shared/abstract-entity';

@Entity('charges')
export class Charge extends AbstractEntity {
  @Column()
  txRef: string;

  @Column()
  flwRef: string;

  @Column()
  amount: number;

  @Column()
  chargedAmount: string;

  @Column()
  accountId: string;

  @Column()
  currency: string;

  @Column()
  processorResponse: string;

  @Column()
  cardId: string;

  @ManyToOne((type) => Card, (card) => card.charges)
  card: Card;
}
