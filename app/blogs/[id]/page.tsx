import { getOneBlog } from '@/app/services/blogs';
import { notFound } from 'next/navigation';
import { likeTheBlog } from '@/app/actions/blogs';
const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getOneBlog(id);
  if (!blog) {
    notFound();
  }
  return (
    <div>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>{blog.likes}</div>
      <form action={likeTheBlog}>
        <input type='hidden' value={blog.id} name='id' />
        <button type='submit'>Like</button>
      </form>
    </div>
  );
};
export default Blog;
