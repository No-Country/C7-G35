import { DataSource } from 'typeorm';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { postgresConfig } from './typeOrmConfig';

export const AppDataSource = new DataSource(getDataBaseConfig());

export async function createTypeOrmClientConnection(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw new Error('Error during Data Source initialization');
  }
}

export function getDataBaseConfig() {
  if (process.env.NODE_ENV === 'production') {
    const productionConnection: PostgresConnectionOptions = {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.username,
      password: postgresConfig.password,
      database: postgresConfig.database,
      entities: [`${__dirname}/../../src/modules/**/*{.js,.ts}`],
      ssl: {
        rejectUnauthorized: false
      }
      //synchronize: true,
      //logging: true
    };
    return productionConnection;
  }

  const devConnection: BetterSqlite3ConnectionOptions = {
    type: 'better-sqlite3',
    database: `${__dirname}/../../project.sql`,
    entities: [`${__dirname}/../../src/modules/**/*{.js,.ts}`],
    logging: true,
    synchronize: true
  };

  return devConnection;
}
