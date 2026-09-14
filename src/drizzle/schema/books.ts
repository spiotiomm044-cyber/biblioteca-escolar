import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  isbn: text('isbn').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  quantity_available: integer('quantity_available').notNull().default(0),
  quantity_total: integer('quantity_total').notNull(),
  created_by: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
