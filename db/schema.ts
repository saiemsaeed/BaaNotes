import { db } from '@/db';
import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: text('id').primaryKey(),
  text: text('text').notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' })
    .notNull()
    .default(false),
});

export type User = typeof todos.$inferSelect;
export type UserInsert = typeof todos.$inferInsert;
