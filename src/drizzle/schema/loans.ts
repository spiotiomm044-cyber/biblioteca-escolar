import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { students } from './students';
import { books } from './books';
import { users } from './users';

export const loans = pgTable('loans', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  book_id: integer('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  librarian_id: integer('librarian_id')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  loan_date: timestamp('loan_date', { withTimezone: true }).defaultNow().notNull(),
  return_date: timestamp('return_date', { withTimezone: true }),
  expected_return_date: timestamp('expected_return_date', { withTimezone: true }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
});

export type Loan = typeof loans.$inferSelect;
export type NewLoan = typeof loans.$inferInsert;
