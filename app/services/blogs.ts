import { eq, ilike } from 'drizzle-orm';
import { db } from '../../db/index';
import { blogs, readingList } from '../../db/schema';
export const getBlogs = async (filter: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
    });
  }
  return db.query.blogs.findMany({});
};

export const getOneBlog = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number,
) => {
  const newBlog = await db
    .insert(blogs)
    .values({ title, author, url, userId })
    .returning({ id: blogs.id });
  const createdBlogId = newBlog[0].id;

  await db.insert(readingList).values({
    userId: userId,
    blogId: createdBlogId,
  });
};

export const likeBlog = async (id: number) => {
  const blogToUpdate = await getOneBlog(id);
  if (blogToUpdate && blogToUpdate.likes != null) {
    await db
      .update(blogs)
      .set({ likes: (blogToUpdate.likes += 1) })
      .where(eq(blogs.id, id));
  }
};
