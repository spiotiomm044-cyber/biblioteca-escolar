import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  registration_number: text('registration_number').notNull().unique(),
  grade: text('grade').notNull(),
  section: text('section').notNull(),
  phone_number: text('phone_number'),
  parent_email: text('parent_email'),
  created_by: integer('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deletedAt', { withTimezone: true }),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
