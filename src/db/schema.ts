import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'appointments' table
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  patientName: text('patient_name').notNull(),
  phone: text('phone').notNull(),
  treatmentId: text('treatment_id').notNull(),
  treatmentName: text('treatment_name').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  notes: text('notes'),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'reviews' table
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  patientName: text('patient_name').notNull(),
  treatmentName: text('treatment_name').notNull(),
  rating: integer('rating').notNull().default(5),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  reviews: many(reviews),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));
