import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { sessionStorage } from '@/lib/localStorage';

import Layout from '@/components/layout/Layout';

export default function HomePage() {
  const isLogin = sessionStorage.getItem('is_login');
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  return (
    <Layout>
      <main>hello</main>
    </Layout>
  );
}
