import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import {
  TYPEORM_CONNECTION_STRING,
  TYPEORM_ENTITIES,
  TYPEORM_SSL,
  TYPEORM_SYNCHRONIZE,
} from '.';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: TYPEORM_CONNECTION_STRING,
  // host: TYPEORM_HOST,
  // port: Number(TYPEORM_PORT),
  // username: TYPEORM_USERNAME,
  // password: TYPEORM_PASSWORD,
  // database: TYPEORM_DATABASE,
  entities: [TYPEORM_ENTITIES],
  // entities: [
  //   // TYPERORM_ENTITIES,
  //   __dirname + '/../**/*.entity.{js,ts}',
  // ],
  autoLoadEntities: true,
  extra: {
    ssl: TYPEORM_SSL,
  },
  synchronize: TYPEORM_SYNCHRONIZE,
  logging: false,
};
