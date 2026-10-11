import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
export const GET = async (req: NextRequest) => {
  const encodedToken = req.headers.get('authorization');
  if (!encodedToken || !encodedToken.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'invalid token' },
      {
        status: 401,
      },
    );
  }
  const token = encodedToken.substring(7);
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
    columns: {
      token: false,
      passwordHash: false,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  return NextResponse.json(user, { status: 200 });
};
