'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export default function NavBar() {
  return (
    <div className='flex h-[60px] w-full items-center justify-end border border-x-0 border-t-0 border-b-gray-500 bg-black px-10'>
      <Button className='h-10' onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  )
}
