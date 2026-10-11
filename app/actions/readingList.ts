'use server';
import { auth } from '@/auth';
import { addReadingList, markAsRead } from '../services/readingList';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './session';
export const addToReadingList = async (formDate: FormData) => {
  const blogId = formDate.get('id') as string;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('unauthorized');
  }
  await addReadingList(Number(blogId), Number(user.id));
  revalidatePath(`/blogs/${blogId}`);
};

export const makeItRead = async (formDate: FormData) => {
  const user = await auth();
  if (!user) {
    throw new Error('unauthorized');
  }
  const readinglistID = formDate.get('readingID');
  await markAsRead(Number(readinglistID));
  revalidatePath('/me');
};
