import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: `${process.env.DB_TYPE}`,
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

const connectionConfig = process.env.DB_URL
  ? {
      type: process.env.DB_TYPE,
      url: process.env.DB_URL,
      entities: ['dist/src/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      ssl: true,
      extra: {
      ssl: {
        rejectUnauthorized: false
      }
  }
    }
  : config;

export default registerAs('typeorm', () => connectionConfig);
export const connectionSource = new DataSource(config as DataSourceOptions);
