const prefix = (path) => {
    let prefix = null;
    switch (process.env.NODE_ENV) {
      // development uses tsc-watch now
      case 'development':
      default:
        prefix = 'dist';
        break;
    }
  
    return `${prefix}/${path}`;
  };
  
  const config = {
    type: 'mysql',
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    synchronize: false,
    logging: false,
    entities: [prefix('{entity,domain,projection}/**/*.*')],
    migrations: [prefix('migration/**/*.*')],
    subscribers: [prefix('{subscriber,domain,projection}/**/*.*')],
    cli: {
      entitiesDir: prefix('{entity,domain,projection}'),
      migrationsDir: prefix('migration'),
      subscribersDir: prefix('{subscriber,domain,projection}'),
    },
  };
  module.exports = config;
  