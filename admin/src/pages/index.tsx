import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Layout from '@/components/layout/Layout';

export default function HomePage() {
  const isLogin = Cookies.get('loggedIn');
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  });

  return <Layout>hello</Layout>;
}
