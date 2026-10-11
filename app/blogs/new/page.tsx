'use client';
import { createBlog } from '@/app/actions/blogs';
import { useNotification } from '@/app/components/NotificationProvider';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const BlogsForm = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { titleError: '', authorError: '', urlError: '' },
    values: { title: '', author: '', url: '' },
    success: false,
  });
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.success) {
      showNotification('blog created', 'success');
      router.push('/blogs');
    }
  }, [state, router, showNotification]);
  return (
    <div>
      <h2 className='text-2xl my-4'>create new blog</h2>
      <form action={formAction}>
        <div className='flex gap-2 my-2'>
          <label className='text-lg' htmlFor='title'>
            Title
          </label>
          <input
            className='bg-white text-black p-1'
            id='title'
            name='title'
            type='text'
            required
            minLength={5}
            defaultValue={state.values.title}
          />
        </div>
        {state.errors.titleError && (
          <p style={{ color: 'red' }}>{state.errors.titleError}</p>
        )}
        <div className='flex gap-2 my-2'>
          <label htmlFor='author' className='text-lg'>
            Author
          </label>
          <input
            id='author'
            className='bg-white text-black p-1'
            name='author'
            type='text'
            required
            minLength={5}
            defaultValue={state.values.author}
          />
        </div>
        {state.errors.authorError && (
          <p style={{ color: 'red' }}>{state.errors.authorError}</p>
        )}
        <div className='flex gap-2 my-2'>
          <label htmlFor='url' className='text-lg'>
            URL
          </label>
          <input
            id='url'
            className='bg-white text-black p-1'
            name='url'
            type='text'
            required
            minLength={5}
            defaultValue={state.values.url}
          />
        </div>
        {state.errors.urlError && (
          <p style={{ color: 'red' }}>{state.errors.urlError}</p>
        )}
        <button
          data-testid='create-blog-button'
          type='submit'
          className='bg-blue-500 text-white p-4'
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogsForm;
