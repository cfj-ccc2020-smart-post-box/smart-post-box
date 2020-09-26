module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'development',
  synchronize: false,
  entities: [process.env.TS_NODE === 'true' ? './server/api/entities/*.entity.ts' : './dist/api/entities/*.entity.js'],
  migrations: [process.env.TS_NODE === 'true' ? './server/api/db/migrations/*.ts' : './dist/api/db/migrations/*.js'],
  subscribers: [process.env.TS_NODE === 'true' ? './server/api/db/subscribers/*.ts' : './dist/api/db/subscribers/*.js'],
  cli: {
    entitiesDir: './server/api/entities/',
    migrationsDir: './server/api/db/migrations/',
    subscribersDir: './server/api/db/subscribers/',
  },
};
