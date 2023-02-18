import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  BsArrowBarLeft,
  BsArrowBarRight,
  BsFillBookFill,
  BsFillFileTextFill,
} from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';

import { useUIContext } from '@/context/UIContext';

export default function Sidebar() {
  const { sidebarCollapse, setSidebarCollapse } = useUIContext();
  const [mounted, setMounted] = useState(false);

  const navClassName = classNames(
    'z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl fixed top-0 bottom-0 w-64 flex-row overflow-hidden overflow-y-auto',
    {
      'w-16': sidebarCollapse,
    }
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className={navClassName}>
      <div className='mx-auto flex min-h-full w-full flex-col flex-wrap items-stretch justify-between px-0'>
        <div className='flex w-full flex-row items-center justify-between h-5'>
          {sidebarCollapse ? null : (
            <Link
              href='/'
              className='m-0 block whitespace-nowrap p-0 text-left text-sm font-bold uppercase text-slate-600'
            >
              Admin
            </Link>
          )}
          <button onClick={() => setSidebarCollapse(!sidebarCollapse)}>
            {sidebarCollapse ? <BsArrowBarRight /> : <BsArrowBarLeft />}
          </button>
        </div>
        <div className='relative top-0 left-0 right-0 z-40 mt-4 flex h-auto flex-1 flex-col items-stretch overflow-y-auto overflow-x-hidden rounded opacity-100 shadow-none '>
          <hr className='my-4 min-w-full' />
          <ul className='flex min-w-full list-none flex-col'>
            <SidebarItem
              href='/'
              title='Home'
              icon={<FaHome />}
              sidebarCollapse={sidebarCollapse}
            />
            <SidebarItem
              href='/blog'
              title='Blog'
              icon={<BsFillFileTextFill />}
              sidebarCollapse={sidebarCollapse}
            />
            <SidebarItem
              href='/guestbook'
              title='Guest Book'
              icon={<BsFillBookFill />}
              sidebarCollapse={sidebarCollapse}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

type SidebarItemProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
  sidebarCollapse?: boolean;
};

function SidebarItem({
  href,
  title,
  icon,
  sidebarCollapse = false,
}: SidebarItemProps) {
  const router = useRouter();

  const linkClassName = classNames(
    'block p-0 text-xs font-bold uppercase flex flex-row items-center w-full',
    {
      'text-sky-500 hover:text-sky-600': router.pathname === href,
      'text-slate-700 hover:text-slate-500': router.pathname !== href,
    }
  );

  return (
    <li className='flex h-10'>
      <Link href={href} className={linkClassName}>
        {icon}
        {sidebarCollapse ? null : <span className='pl-2'>{title}</span>}
      </Link>
    </li>
  );
}
