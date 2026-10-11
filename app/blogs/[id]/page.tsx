import { getOneBlog } from '@/app/services/blogs';
import { notFound } from 'next/navigation';
import { likeTheBlog } from '@/app/actions/blogs';
import { getCurrentUser } from '@/app/actions/session';
import { addToReadingList } from '@/app/actions/readingList';
const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getOneBlog(Number(id));
  const currentUser = await getCurrentUser();
  if (!blog) {
    notFound();
  }
  return (
    <div className='p-10 border-2' data-testid='blog-detail'>
      <div data-testid='blog-title' className='text-2xl'>
        {blog.title}
      </div>
      <div data-testid='blog-author' className='text-lg'>
        {blog.author}
      </div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
      <form action={likeTheBlog}>
        <input type='hidden' value={blog.id} name='id' />
        <button
          className='p-4 bg-green-300 text-white hover:bg-green-700'
          type='submit'
        >
          Like
        </button>
        {blog.userId !== currentUser?.id && (
          <button
            formAction={addToReadingList}
            className='p-4 bg-amber-300 text-white hover:bg-amber-700'
            data-testid='add-to-reading-list-button'
          >
            add to reading list
          </button>
        )}
      </form>
    </div>
  );
};
export default Blog;
