'use server';
import { addNewUser, getOneUser, saveTokenToUser } from '../services/users';
import { getCurrentUser } from './session';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
export const registerUser = async (
  prevState: {
    errors: {
      usernameError: string;
      passwordError: string;
      passwordConfirmError: string;
    };
    values: {
      name: string;
      username: string;
      password: string;
      passwordConfirm: string;
    };
  },
  formData: FormData,
) => {
  const errors = {
    usernameError: '',
    passwordError: '',
    passwordConfirmError: '',
  };
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  if (!username || username.length < 4) {
    errors.usernameError = 'username should be at least 4 characers';
  }

  const user = await getOneUser(username);
  if (user) {
    errors.usernameError = 'username already existed choose another one';
  }

  const password = formData.get('password') as string;
  if (!password || password.length < 4) {
    errors.passwordError = 'password should be at least 4 characers';
  }
  const passwordConfirm = formData.get('passwordConfirm') as string;
  if (!passwordConfirm || passwordConfirm !== password) {
    errors.passwordConfirmError =
      'password confirm and password should be the same';
  }
  if (
    errors.usernameError ||
    errors.passwordError ||
    errors.passwordConfirmError
  ) {
    return { errors, values: { name, username, password, passwordConfirm } };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await addNewUser(name, username, passwordHash);
  redirect('/login');
};

export const addTokenToUser = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('unauthorized');
  }
  await saveTokenToUser(currentUser?.username as string);
  revalidatePath('/me');
};
