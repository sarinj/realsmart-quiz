import LoginSection from '@/components/loginSection'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()

  if (session) {
    redirect('/home')
  }

  return (
    <main className='flex size-full h-screen items-center justify-center'>
      <div className='w-[450px] rounded-[4px] bg-black px-[68px] py-12 text-white'>
        <LoginSection />
      </div>
    </main>
  )
}
