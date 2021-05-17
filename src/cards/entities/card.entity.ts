import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/abstract-entity';

@Entity('cards')
export class Card extends AbstractEntity {
  @Column()
  customerId: string;

  @Column()
  cardNumber: string;

  @Column()
  cvv: string;

  @Column()
  cardType: string;

  @Column()
  expiryYear: string;

  @Column()
  expiryMonth: string;

  @Column()
  currency: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  token: string;
}
