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
    <div className='flex flex-col'>
      <h2 className='text-2xl my-2 '>Blogs</h2>
      <form action='/blogs'>
        <input
          data-testid='filter-input'
          type='search'
          name='filter'
          className='bg-white h-10 text-black p-1'
        />
        <button
          className='bg-white text-black hover:bg-gray-500  p-2'
          type='submit'
          data-testid='search-button'
        >
          search
        </button>
      </form>
      <ul className='flex flex-col gap-5 mt-2' data-testid='blogs-list'>
        {blogs.map((blog) => {
          return (
            <li key={blog.id} className='border-2 p-2'>
              <Link
                className='bg-blue-300 text-white p-1 hover:bg-gray-400'
                href={`/blogs/${blog.id}`}
              >
                {blog.title}
              </Link>
              <div>{blog.author}</div>
              <div>{blog.url}</div>
              <div>{blog.likes} likes</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blogs;
