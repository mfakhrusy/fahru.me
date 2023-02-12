import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type AuthLayoutProps = PropsWithChildren<{
  footer?: {
    link: string;
    text: string;
  };
  headerText: string;
}>;

export default function AuthLayout({
  children,
  headerText,
  footer,
}: AuthLayoutProps) {
  return (
    <main>
      <section className='relative h-full min-h-screen w-full py-40'>
        <div
          className='bg-full absolute top-0 h-full w-full bg-slate-800 bg-no-repeat'
          style={{
            backgroundImage: "url('/images/auth_bg.png')",
          }}
        />
        <div className='container mx-auto h-full px-4'>
          <div className='flex h-full content-center items-center justify-center'>
            <div className='w-full px-4 lg:w-4/12'>
              <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-slate-200 shadow-lg'>
                <div className='flex-auto px-4 py-10 pt-0 lg:px-10'>
                  <p className='mt-5 font-bold'>{headerText}</p>
                  {children}
                </div>
              </div>
              {footer ? (
                <div className='relative mt-6 flex flex-wrap'>
                  <div>
                    <Link href={footer.link} className='text-slate-200'>
                      <small>{footer.text}</small>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
