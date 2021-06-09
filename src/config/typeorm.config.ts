import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.TYPEORM_CONNECTION_STRING,
  entities: [process.env.TYPERORM_ENTITIES,__dirname + '/../**/*.entity.{js,ts}'],
  extra: {
    ssl: parseInt(process.env.TYPEORM_SSL),
  },
  synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true' ? true : false,
  logging: false
};
