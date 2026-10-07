import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getUsers } from '../services/users';
const UserPage = async () => {
  const users = await getUsers();
  if (!users) {
    notFound();
  }
  return (
    <div>
      <h2>Users</h2>

      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link href={`/users/${user.username}`}>{user.name}</Link>
              {/* <div>{user.username}</div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserPage;
