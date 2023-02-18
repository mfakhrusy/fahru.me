import { ReactNode } from 'react';

import Sidebar from '@/components/Sidebar';

import { useUIContext } from '@/context/UIContext';

export default function Layout({ children }: { children: ReactNode }) {
  const { sidebarCollapse } = useUIContext();

  const className = `relative h-full bg-slate-100 ${
    sidebarCollapse ? 'ml-16' : 'ml-64'
  }`;

  return (
    <>
      <Sidebar />
      <main className={className}>{children}</main>
    </>
  );
}
