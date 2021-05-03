import * as _ from 'lodash';

export function toDto<T, E>(
  model: new (entity: E, options?: any) => T,
  entity: E,
  options?: any,
): T;

export function toDto<T, E>(
  model: new (entity: E, options?: any) => T,
  entity: E[],
  options?: any,
): T[];

export function toDto<T, E>(
  model: new (entity: E, options?: any) => T,
  entity: E | E[],
  options?: any,
): T | T[] {
  if (_.isArray(entity)) {
    return entity.map(u => new model(u, options));
  }

  return new model(entity, options);
}
