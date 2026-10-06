import { getBlogs } from '../services/blogs';
import Link from 'next/link';
const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;

  const blogs = await getBlogs(filter);

  return (
    <div>
      <h2>Blogs</h2>
      <form action='/blogs'>
        <input type='search' name='filter' />
        <button type='submit'>search</button>
      </form>
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              <div>{blog.author}</div>
              <div>{blog.url}</div>
              <div>{blog.likes}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blogs;
