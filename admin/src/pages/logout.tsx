import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import AuthLayout from '@/components/layout/AuthLayout';

export default function Logout() {
  const router = useRouter();

  return (
    <AuthLayout headerText='Log out'>
      <div className='mt-5'>
        <div className='mt-6 text-center'>
          <button
            className='mr-1 mb-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600'
            type='button'
            onClick={() => {
              Cookies.remove('loggedIn');
              router.replace('/login');
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
