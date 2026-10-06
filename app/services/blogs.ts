import { eq, ilike } from 'drizzle-orm';
import { db } from '../../db/index';
import { blogs } from '../../db/schema';
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

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url });
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

// export const filterBlogs = async (filter: string) => {
//   return db.query.blogs.findMany({
//     where: ilike(blogs.title, `%${filter}%`),
//   });
// };
