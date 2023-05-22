import Link from 'next/link'

const Welcome = () => {
  return (
    <div>
      <p className="p-10 text-4xl">Welcome</p>
      <div className="">
        <Link
          className="mb-6 mr-2 block items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
          href="/login"
        >
          Sign in
        </Link>
        <Link
          className="mb-2 mr-2 block items-center rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-400/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default Welcome
