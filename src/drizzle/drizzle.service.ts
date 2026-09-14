import { Injectable } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DrizzleService {
  private db: PostgresJsDatabase<typeof schema>;

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    const client = postgres(connectionString);
    this.db = drizzle(client, { schema });
  }

  getDatabase(): PostgresJsDatabase<typeof schema> {
    return this.db;
  }
}
