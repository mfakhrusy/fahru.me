import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Sidebar() {
  return (
    <nav className='relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto'>
      <div className='mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch'>
        <Link
          href='/'
          className='mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase text-slate-600 md:block md:pb-2'
        >
          Admin
        </Link>
        <div className='absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none '>
          <hr className='my-4 md:min-w-full' />
          <h6 className='block pt-1 pb-4 text-xs font-bold uppercase text-slate-500 no-underline md:min-w-full'>
            MENU
          </h6>
          <ul className='flex list-none flex-col md:min-w-full md:flex-col'>
            <SidebarItem href='/' title='Home' />
            <SidebarItem href='/blog' title='Blog' />
            <SidebarItem href='/guestbook' title='Guest Book' />
          </ul>
        </div>
      </div>
    </nav>
  );
}

type SidebarItemProps = {
  href: string;
  title: string;
};

function SidebarItem({ href, title }: SidebarItemProps) {
  const router = useRouter();

  return (
    <li className='items-center'>
      <Link
        href={href}
        className={
          'block py-3 text-xs font-bold uppercase ' +
          (router.pathname === href
            ? 'text-sky-500 hover:text-sky-600'
            : 'text-slate-700 hover:text-slate-500')
        }
      >
        {title}
      </Link>
    </li>
  );
}
