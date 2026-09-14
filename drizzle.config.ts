import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const config = {
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: dbUrl,
  },
} satisfies Config;

export default config;
