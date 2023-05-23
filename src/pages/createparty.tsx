import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { NEXT_API_URL } from '@/environments'
import { User } from '@/types/User'

const Createparty = () => {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)

  const handleParty = async () => {
    if (nameRef.current?.value) {
      try {
        await axios.post<User>(`${NEXT_API_URL}/party`, {
          name: nameRef.current.value,
        })
        alert('Create party success')
        router.replace('/')
      } catch (error) {
        alert('Create party fail')
      }
    }
  }

  return (
    <main className="container m-8 mx-auto flex min-h-screen flex-col items-center justify-between rounded-lg bg-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create party
          </h2>
        </div>

        <div className="mt-10">
          <form action="#" className="space-y-6" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                Name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  id="name"
                  name="name"
                  ref={nameRef}
                  required
                  type="text"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleParty}
                type="button"
              >
                Create Party
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Createparty
