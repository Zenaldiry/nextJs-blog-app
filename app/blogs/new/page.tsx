import { createBlog } from '@/app/actions/blogs';
const BlogsForm = () => {
  return (
    <div>
      <h2>create new blog</h2>
      <form action={createBlog}>
        <div>
          <label htmlFor='title'>title</label>
          <input name='title' type='text' required />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input name='author' type='text' required />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input name='url' type='text' required />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default BlogsForm;
