import { toDto } from '../utils/toDto';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractDto } from './abstract.dto';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any): T {
    return toDto(this.dtoClass, this, options);
  } */
}
