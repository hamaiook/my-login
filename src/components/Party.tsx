import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { NEXT_API_URL } from '@/environments'
import { Party } from '@/types/Party'

const PartyPage = () => {
  const router = useRouter()
  const [listParty, setListParty] = useState<Party[]>([])

  const fetchParty = useCallback(async (controller: AbortController) => {
    try {
      const { data } = await axios.get<Party[]>(`${NEXT_API_URL}/party`, {
        signal: controller.signal,
      })
      setListParty(data)
    } catch (error) {}
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchParty(controller)

    return () => {
      controller.abort()
    }
  }, [fetchParty])

  const handleJoin = async (id: number) => {
    const token = Cookies.get('login-token') as string
    try {
      await axios.post(`${NEXT_API_URL}/join/party`, {
        party_id: id,
        user_id: Number(token),
      })
      alert('Join success')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message)
      }
    }
  }

  const handleParty = () => {
    router.push('/createparty')
  }

  return (
    <div>
      <p className="flex items-center justify-center p-10 text-4xl">Party</p>
      <div className="flex w-[500px] justify-end">
        <button
          className="mb-2 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleParty}
          type="button"
        >
          Add party
        </button>
      </div>
      {listParty.map((list) => {
        return (
          <div
            className="mb-2 flex w-[500px] items-center justify-between rounded-lg bg-gray-200 px-4 py-4 hover:bg-gray-100"
            key={list.id}
          >
            <span>{list.name}</span>
            <span
              className="cursor-pointer rounded-lg bg-blue-200 px-4 py-2 hover:bg-blue-100"
              onClick={() => handleJoin(list.id)}
            >
              Join
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default PartyPage
