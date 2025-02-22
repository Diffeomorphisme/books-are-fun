import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const book = pgTable('book', {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar('title').notNull(),
});

export type Book = typeof book.$inferSelect;
export type InsertBook = typeof book.$inferInsert

