'use client';
import NavLink from './NavLink';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const NavBar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <nav className='flex '>
        <NavLink href='/' content='home' />
        <NavLink href='/blogs' content='blogs' />
        <NavLink href='/users' content='users' />
        {session ? (
          <>
            <NavLink href='/blogs/new' content='create blog' />
            <NavLink href='/me' content='me' />
            <em className='bg-white text-black self-center p-5 text-sm'>
              {session.user?.name} logged in
            </em>
            <button
              className='bg-red-400 p-5 hover:bg-amber-600'
              onClick={() => signOut()}
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href='/login' content='login' />
            <NavLink href='/register' content='register' />
          </>
        )}
      </nav>
    </div>
  );
};
export default NavBar;
