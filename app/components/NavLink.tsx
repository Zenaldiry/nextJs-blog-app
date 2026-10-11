import Link from 'next/link';

const NavLink = ({ href, content }: { href: string; content: string }) => {
  return (
    <Link
      className='flex-1 bg-blue-400 hover:bg-gray-400 text-center p-5'
      href={href}
    >
      {content}
    </Link>
  );
};

export default NavLink;
