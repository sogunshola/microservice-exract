import * as env from 'env-var';
// import { config } from 'dotenv';
import * as dotenv from 'dotenv';

// import * as
dotenv.config();

export const TYPEORM_PORT = env.get('TYPEORM_PORT').required().asInt();
export const SECRET = env.get('SECRET').required().asString();
export const TYPEORM_CONNECTION = env
  .get('TYPEORM_CONNECTION')
  .required()
  .asString();
export const TYPEORM_USERNAME = env
  .get('TYPEORM_USERNAME')
  .required()
  .asString();
export const TYPEORM_PASSWORD = env
  .get('TYPEORM_PASSWORD')
  .required()
  .asString();
export const TYPEORM_HOST = env.get('TYPEORM_HOST').required().asString();
export const TYPEORM_DATABASE = env
  .get('TYPEORM_DATABASE')
  .required()
  .asString();
export const TYPEORM_ENTITIES = env
  .get('TYPEORM_ENTITIES')
  .required()
  .asString();
export const TYPEORM_SUBSCRIBERS = env
  .get('TYPEORM_SUBSCRIBERS')
  .required()
  .asString();
export const TYPEORM_MIGRATIONS = env
  .get('TYPEORM_MIGRATIONS')
  .required()
  .asString();
export const TYPEORM_MIGRATIONS_DIR = env
  .get('TYPEORM_MIGRATIONS_DIR')
  .required()
  .asString();
export const TYPEORM_SYNCHRONIZE = env
  .get('TYPEORM_SYNCHRONIZE')
  .required()
  .asBool();
export const TYPEORM_CONNECTION_STRING = env
  .get('TYPEORM_CONNECTION_STRING')
  .required()
  .asString();
export const TYPEORM_DRIVER_EXTRA = env
  .get('TYPEORM_DRIVER_EXTRA')
  .required()
  .asString();
export const PORT = env.get('PORT').required().asInt();
export const RMQ_URL = env.get('RMQ_URL').required().asString();
export const REDIS_URL = env.get('REDIS_URL').required().asString();
export const CARD_RMQ_QUEUE = env.get('CARD_RMQ_QUEUE').required().asString();
export const IDENTITY_RMQ_QUEUE = env
  .get('IDENTITY_RMQ_QUEUE')
  .required()
  .asString();
export const BALANCE_RMQ_QUEUE = env
  .get('BALANCE_RMQ_QUEUE')
  .required()
  .asString();
export const BASE_URL = env.get('BASE_URL').required().asString();
export const TOKENIZED_CHARGE_URI = env
  .get('TOKENIZED_CHARGE_URI')
  .required()
  .asString();
export const VALIDATE_CHARGE_URI = env
  .get('VALIDATE_CHARGE_URI')
  .required()
  .asString();
export const CHARGE_URI = env.get('CHARGE_URI').required().asString();
export const FLUTTERWAVE_ENCRYPTION_KEY = env
  .get('FLUTTERWAVE_ENCRYPTION_KEY')
  .required()
  .asString();
export const FLUTTERWAVE_SECRET_KEY = env
  .get('FLUTTERWAVE_SECRET_KEY')
  .required()
  .asString();
export const VGS_PASSWORD = env.get('VGS_PASSWORD').required().asString();
export const VGS_USERNAME = env.get('VGS_USERNAME').required().asString();
export const VGS_OUTBOUND_URL = env
  .get('VGS_OUTBOUND_URL')
  .required()
  .asString();
export const VGS_HOST = env.get('VGS_HOST').required().asString();
export const VGS_PORT = env.get('VGS_PORT').required().asString();
export const NODE_EXTRA_CA_CERTS = env
  .get('NODE_EXTRA_CA_CERTS')
  .required()
  .asString();
export const NODE_TLS_REJECT_UNAUTHORIZED = env
  .get('NODE_TLS_REJECT_UNAUTHORIZED')
  .required()
  .asInt();
export const TEST_BUSINESS_ID = env
  .get('TEST_BUSINESS_ID')
  .required()
  .asString();
export const TYPEORM_SSL = env.get('TYPEORM_SSL').required().asBool();
