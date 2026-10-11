import { auth } from '@/auth';
import { getOneUser } from '../services/users';
import { redirect } from 'next/navigation';
import { addTokenToUser } from '../actions/users';
import { getReadingList } from '../services/readingList';
import { makeItRead } from '../actions/readingList';
const Me = async () => {
  const userFromAuth = await auth();
  if (!userFromAuth) {
    redirect('/login');
  }
  const user = await getOneUser(userFromAuth?.user?.email as string);
  if (!user) {
    redirect('/login');
  }
  const readingList = await getReadingList(user.id);
  const readBlogs = readingList.filter((r) => r.read === true);
  const unreadBlogs = readingList.filter((r) => r.read === false);

  return (
    <div data-testid='user-profile'>
      <h2>My Profile</h2>
      <p className='text-2xl' data-testid='user-name'>
        Name: {user?.name}
      </p>
      <p className='text-2xl' data-testid='user-username'>
        Username: {user?.username}
      </p>
      <form
        className='p-5 border'
        action={addTokenToUser}
        data-testid='api-token-section'
      >
        <h3>API Token</h3>
        <p className='my-3'>current Token</p>
        <span className='bg-white text-black p-2 ' data-testid='token-display'>
          {user?.token !== null ? (
            <span data-testid='api-token'>{user?.token}</span>
          ) : (
            <span data-testid='no-token-message'>no token</span>
          )}
        </span>
        <button
          data-testid='generate-token-button'
          type='submit'
          className='block bg-white text-black p-2 my-3'
        >
          Genereate Token
        </button>
      </form>
      <div data-testid='reading-list-section'>
        <h2>Reading List</h2>
        {(readBlogs.length === 0 && unreadBlogs.length === 0) === true ? (
          <div data-testid='empty-reading-list'>no reading list</div>
        ) : (
          <div>
            <div className='mb-6'>
              <h3 className='text-xl font-bold'>
                Unread ({unreadBlogs.length})
              </h3>
              {unreadBlogs.length === 0 ? (
                <div data-testid='no-unread-blogs'>no unread blogs</div>
              ) : (
                <ul data-testid='unread-section'>
                  {unreadBlogs.map((r) => (
                    <li className='my-2 p-2 border' key={r.id}>
                      <form action={makeItRead}>
                        <input
                          type='hidden'
                          name='readingID'
                          defaultValue={r.id}
                        />
                        <p>{r.blogs.title}</p>
                        <button
                          type='submit'
                          className='bg-green-300 hover:bg-amber-600 text-white p-2 inline'
                          data-testid='mark-read-'
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className='text-xl font-bold'>Read ({readBlogs.length})</h3>
              <ul>
                {readBlogs.map((r) => (
                  <li key={r.id} className='my-2 p-2 border text-gray-500'>
                    <p>{r.blogs.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Me;
