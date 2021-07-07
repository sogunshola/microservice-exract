import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/abstract-entity';

@Entity('redirect-link')
export class RedirectLink extends AbstractEntity {
  @Column()
  link: string;
}
