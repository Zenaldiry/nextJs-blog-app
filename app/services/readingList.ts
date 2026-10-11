import { db } from '@/db';
import { readingList } from '@/db/schema';
import { eq } from 'drizzle-orm';
export const addReadingList = async (blogId: number, userId: number) => {
  await db.insert(readingList).values({ userId, blogId });
};

export const getReadingList = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blogs: true },
  });
};

export const markAsRead = async (readingId: number) => {
  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, readingId));
};
