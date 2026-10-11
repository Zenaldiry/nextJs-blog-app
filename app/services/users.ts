import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
export const getUsers = async () => {
  return db.query.users.findMany({});
};

export const getOneUser = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const addNewUser = async (
  name: string,
  username: string,
  passwordHash: string,
) => {
  return db.insert(users).values({ name, username, passwordHash });
};

export const generateToken = () => {
  return crypto.randomUUID();
};

export const saveTokenToUser = async (username: string) => {
  const token = generateToken();
  await db
    .update(users)
    .set({ token: token })
    .where(eq(users.username, username));
};
