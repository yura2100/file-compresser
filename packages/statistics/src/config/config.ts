export type Config = typeof config;
export type DatabaseConfig = Config['db'];

const config = {
  db: {
    uri: process.env.DATABASE_URI as string,
  },
};

export default () => config;
