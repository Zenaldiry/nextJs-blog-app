import { notFound } from 'next/navigation';
import { getOneUser } from '@/app/services/users';
const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await getOneUser(username);
  if (!user) {
    notFound();
  }
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.username}</div>
      <div>
        {user.blogs.map((blog) => {
          return (
            <ul key={blog.id}>
              <li>{blog.title}</li>
              <li>{blog.author}</li>
              <li>{blog.url}</li>
              <li>{blog.likes}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
export default User;
