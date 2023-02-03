import Link from "next/link";
import { PropsWithChildren } from "react";

type AuthLayoutProps = PropsWithChildren<{
  footer: {
    link: string,
    text: string
  }
  headerText: string,
}>

export default function AuthLayout({ children, headerText, footer: { link: footerLink, text: footerText } }: AuthLayoutProps) {
  return (
    <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
          style={{
            backgroundImage: "url('/images/auth_bg.png')",
          }}
        />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <p className="font-bold mt-5">
                    {headerText}
                  </p>
                  {children}
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div>
                  <Link href={footerLink} className="text-slate-200">
                    <small>{footerText}</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
