process.env.TS_NODE = (process.env.TS_NODE || 'false').toLowerCase();
process.env.IN_DOKKU = (process.env.IN_DOKKU || 'false').toLowerCase();
process.env.SQLITE = (process.env.SQLITE || 'false').toLowerCase();

const ormConfig = {
  type: 'postgres',
  synchronize: process.env.IN_DOKKU === 'true',
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
  // } else if ('DATABASE_URL' in process.env) {
  //   ormConfig.url = process.env.DATABASE_URL;
} else {
  ormConfig.host = process.env.DB_HOST || 'postgres';
  ormConfig.port = process.env.DB_PORT || 5432;
  ormConfig.username = process.env.DB_USER || 'postgres';
  ormConfig.password = process.env.DB_PASS || 'postgres';
  ormConfig.database = process.env.DB_NAME || 'development';
}

module.exports = ormConfig;
