import { pgTable, serial, integer, decimal, text, timestamp } from 'drizzle-orm/pg-core';
import { students } from './students';
import { loans } from './loans';
import { users } from './users';

export const fines = pgTable('fines', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  loan_id: integer('loan_id')
    .notNull()
    .references(() => loans.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  reason: text('reason').notNull(),
  status: text('status').notNull().default('pending'),
  paid_by: integer('paid_by').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
});

export type Fine = typeof fines.$inferSelect;
export type NewFine = typeof fines.$inferInsert;
