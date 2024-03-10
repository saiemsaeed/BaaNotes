import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: process.env.DB_HOST,
  authToken: process.env.DB_TOKEN,
});

export const db = drizzle(client);
