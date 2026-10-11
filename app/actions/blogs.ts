'use server';
// import { redirect } from 'next/navigation';
import { addBlog, likeBlog } from '../services/blogs';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './session';
export const createBlog = async (
  prevState: {
    errors: { titleError: string; authorError: string; urlError: string };
    values: { title: string; author: string; url: string };
    success: boolean;
  },
  formData: FormData,
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('unauthorized');
  }
  const errors: { titleError: string; authorError: string; urlError: string } =
    {
      titleError: '',
      authorError: '',
      urlError: '',
    };
  const title = formData.get('title') as string;
  if (!title || title.length < 5) {
    errors.titleError = 'title should be at least 5 characters';
  }
  const author = formData.get('author') as string;
  if (!author || author.length < 5) {
    errors.authorError = 'author should be at least 5 characters';
  }
  const url = formData.get('url') as string;
  if (!url || url.length < 5) {
    errors.urlError = 'url should be at least 5 characters';
  }

  if (errors.titleError || errors.authorError || errors.urlError) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog(title, author, url, user.id);
  revalidatePath('/blogs');
  return {
    errors: {
      titleError: '',
      authorError: '',
      urlError: '',
    },
    values: { title: '', author: '', url: '' },
    success: true,
  };

  // redirect('/blogs');
};

export const likeTheBlog = async (formData: FormData) => {
  const id = formData.get('id');
  await likeBlog(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
};
