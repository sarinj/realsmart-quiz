import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className='px-[20%] py-6'>
      <p className='text-xl'>Name: {session?.user?.name}</p>
      <p className='text-xl'>Email: {session?.user?.email}</p>
    </div>
  )
}
