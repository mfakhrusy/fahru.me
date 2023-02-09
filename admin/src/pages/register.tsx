import { useRouter } from 'next/router';
import { FormEventHandler, useCallback } from 'react';

import { sessionStorage } from '@/lib/localStorage';

import AuthLayout from '@/components/layout/AuthLayout';

import { baseURL } from '@/constant/env';

export default function Register() {
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
        const res = await fetch(`${baseURL}/register`, {
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
        link: '/login',
        text: 'Have an account?',
      }}
      headerText='Register'
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
            type='username'
            name='username'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Username'
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
            name='password'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Password'
          />
        </div>
        <div className='relative mb-3 w-full'>
          <label
            className='mb-2 block text-xs font-bold uppercase text-slate-600'
            htmlFor='grid-password'
          >
            Confirm Password
          </label>
          <input
            type='password'
            name='confirm_password'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Password'
          />
        </div>
        <div className='relative mb-3 w-full'>
          <label
            className='mb-2 block text-xs font-bold uppercase text-slate-600'
            htmlFor='grid-password'
          >
            Registration Code
          </label>
          <input
            type='text'
            name='registration_code'
            className='w-full rounded border-0 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring'
            placeholder='Registration Code'
          />
        </div>

        <div className='mt-6 text-center'>
          <button
            className='mr-1 mb-1 w-full rounded bg-slate-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-slate-600'
            type='submit'
          >
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
