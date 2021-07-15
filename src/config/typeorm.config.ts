import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.TYPEORM_CONNECTION_STRING,
  // host: process.env.TYPEORM_HOST,
  // port: Number(process.env.TYPEORM_PORT),
  // username: process.env.TYPEORM_USERNAME,
  // password: process.env.TYPEORM_PASSWORD,
  // database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  // entities: [
  //   // process.env.TYPERORM_ENTITIES,
  //   __dirname + '/../**/*.entity.{js,ts}',
  // ],
  autoLoadEntities: true,
  extra: {
    ssl: parseInt(process.env.TYPEORM_SSL),
  },
  synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true' ? true : false,
  logging: false,
};
