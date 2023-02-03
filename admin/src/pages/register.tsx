import AuthLayout from "@/components/layout/AuthLayout";

import { baseURL } from "@/constant/env";

export default function Register() {
  return (
    <AuthLayout
      footer={{
        link: '/register',
        text: 'Have an account?'
      }}
      headerText="Register"
    >
      <form className="mt-5" action={`${baseURL}/register`} method="post">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Username
          </label>
          <input
            type="username"
            name="username"
            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Username"
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Password"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Password"
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-slate-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Registration Code
          </label>
          <input
            type="text"
            name="registration_code"
            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Registration Code"
          />
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
