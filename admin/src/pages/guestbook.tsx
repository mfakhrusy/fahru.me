import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { sessionStorage } from '@/lib/localStorage';

import Layout from '@/components/layout/Layout';

export default function GuestbookPage() {
  const isLogin = sessionStorage.getItem('isLogin');
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  return <Layout>Guest Book</Layout>;
}
