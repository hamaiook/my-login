import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Party from '@/components/Party'
import Welcome from '@/components/Welcome'

const Index = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string>()

  useEffect(() => {
    const token = Cookies.get('login-token') as string
    if (token) {
      setToken(token)
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    Cookies.remove('login-token')
    router.replace('/login')
  }

  if (isLoading) return <div>Loading....</div>

  return (
    <main className="container m-8 mx-auto  min-h-screen rounded-lg bg-white">
      {token ? (
        <div className="flex justify-end p-6">
          <span className="cursor-pointer text-blue-500" onClick={handleLogout}>
            Logout
          </span>
        </div>
      ) : null}
      <div className="flex items-center justify-center">{token ? <Party /> : <Welcome />}</div>
    </main>
  )
}

export default Index
