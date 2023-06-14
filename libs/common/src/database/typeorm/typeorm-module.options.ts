import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const defaultTypeOrmOptions: DataSourceOptions = {
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  charset: 'utf8mb4',
  timezone: 'Z',
  extra: {
    connectionLimit:
      process.env.NODE_ENV === 'prod'
        ? Number(process.env.DB_CONNECTION_LIMIT)
        : 10,
  },
  logging: ['query'],
};

export const commonTypeOrmModuleOptions: DataSourceOptions = {
  ...defaultTypeOrmOptions,
  host: process.env.COMMON_DB_HOST,
  port: Number(process.env.COMMON_DB_PORT),
  username: process.env.COMMON_DB_ID,
  password: process.env.COMMON_DB_PW,
  database: process.env.COMMON_DB_DATABASE,
  entities: ['dist/libs/dao/src/common/**/*.entity.{ts,js}'],
  synchronize:
    process.env.COMMON_DB_SYNCHRONIZE &&
    JSON.parse(process.env.COMMON_DB_SYNCHRONIZE),
};
