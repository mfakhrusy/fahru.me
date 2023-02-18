import { useRouter } from 'next/router';
import { type FormEventHandler, useCallback } from 'react';

import { sessionStorage } from '@/lib/sessionStorage';

import AuthLayout from '@/components/layout/AuthLayout';

import { baseURL } from '@/constant/env';

export default function Login() {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const body = new URLSearchParams();

      Array.from(event.currentTarget.elements).forEach((elem) => {
        const element = elem as HTMLInputElement;
        if (element.type !== 'submit') {
          body.append(element.name, element.value);
        }
      });

      try {
        const res = await fetch(`${baseURL}/login`, {
          method: 'post',
          body,
        });

        if (res.ok) {
          sessionStorage.setItem('isLogin', true);
          router.replace('/');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
    [router]
  );

  return (
    <AuthLayout
      footer={{
        link: '/register',
        text: 'Create new account',
      }}
      headerText='Sign In'
    >
      <form className='mt-5' onSubmit={handleSubmit}>
        <div className='relative mb-3 w-full'>
          <label
            className='mb-2 block text-xs font-bold uppercase text-slate-600'
            htmlFor='grid-password'
          >
            Username
          </label>
          <input
            type='text'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Username'
            name='username'
          />
        </div>

        <div className='relative mb-3 w-full'>
          <label
            className='mb-2 block text-xs font-bold uppercase text-slate-600'
            htmlFor='grid-password'
          >
            Password
          </label>
          <input
            type='password'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Password'
            name='password'
          />
        </div>
        {/* <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-slate-600">
              Remember me
            </span>
          </label>
        </div> */}

        <div className='mt-6 text-center'>
          <button
            className='mr-1 mb-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
