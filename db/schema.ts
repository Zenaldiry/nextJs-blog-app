import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  token: text('token'),
});

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url'),
  likes: integer('likes').default(0),
  userId: integer('user_id').references(() => users.id),
});
export const readingList = pgTable('reading_list', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  blogId: integer('blog_id')
    .notNull()
    .references(() => blogs.id),
  read: boolean('read').default(false),
});
export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  users: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingList),
}));

export const readingRelations = relations(readingList, ({ one }) => ({
  blogs: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
  users: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
}));
