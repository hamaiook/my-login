import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { NEXT_API_URL } from '@/environments'
import { User } from '@/types/User'

const Login = () => {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      try {
        const { data } = await axios.post<User>(`${NEXT_API_URL}/user/login`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        Cookies.set('login-token', data.id.toString(), { expires: 365 })
        alert('Login success')
        router.replace('/')
      } catch (error) {
        alert('Login fail')
      }
    }
  }

  return (
    <main className="container m-8 mx-auto flex min-h-screen flex-col items-center justify-between rounded-lg bg-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10">
          <form action="#" className="space-y-6" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                Email
              </label>
              <div className="mt-2">
                <input
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  id="email"
                  name="email"
                  ref={emailRef}
                  required
                  type="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  id="password"
                  name="password"
                  ref={passwordRef}
                  required
                  type="password"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
                type="button"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don’t have an account yet?
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
