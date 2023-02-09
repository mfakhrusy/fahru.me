import * as React from 'react';

import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className='relative h-full bg-slate-100 md:ml-64'>{children}</main>
    </>
  );
}
