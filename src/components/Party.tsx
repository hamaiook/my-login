import axios from 'axios'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'

import { NEXT_API_URL } from '@/environments'
import { Party } from '@/types/Party'

const PartyPage = () => {
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

  return (
    <div>
      <p className="flex items-center justify-center p-10 text-4xl">Party</p>
      {listParty.map((list) => {
        return (
          <div
            className="mb-2 flex w-[500px] items-center justify-between rounded-lg bg-gray-200 px-4 py-4"
            key={list.id}
          >
            <span>{list.name}</span>
            <span
              className="cursor-pointer rounded-lg bg-blue-200 px-4 py-2"
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
