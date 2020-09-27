const ormConfig = {
  type: 'postgres',
  synchronize: process.env.NODE_ENV === 'test' || process.env.IN_DOKKU === 'true',
  keepConnectionAlive: true,
  entities: [process.env.TS_NODE === 'true' ? './server/api/entities/*.entity.ts' : './dist/api/entities/*.entity.js'],
  migrations: [process.env.TS_NODE === 'true' ? './server/api/db/migrations/*.ts' : './dist/api/db/migrations/*.js'],
  subscribers: [process.env.TS_NODE === 'true' ? './server/api/db/subscribers/*.ts' : './dist/api/db/subscribers/*.js'],
  cli: {
    entitiesDir: './server/api/entities/',
    migrationsDir: './server/api/db/migrations/',
    subscribersDir: './server/api/db/subscribers/',
  },
};

if ('SQLITE' in process.env && process.env.SQLITE === 'true') {
  ormConfig.type = 'sqlite';
  ormConfig.database = './db.sqlite';
} else if ('DATABASE_URL' in process.env) {
  ormConfig.url = process.env.DATABASE_URL;
} else {
  ormConfig.host = 'postgres';
  ormConfig.port = 5432;
  ormConfig.username = 'postgres';
  ormConfig.password = 'postgres';
  ormConfig.database = 'development';
}

module.exports = ormConfig;
