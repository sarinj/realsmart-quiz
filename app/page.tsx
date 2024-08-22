import LoginSection from '@/components/loginSection'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()

  if (session) {
    redirect('/home')
  }

  return (
    <main
      className='flex size-full h-screen items-center justify-center'
      style={{
        backgroundImage:
          'url(https://assets.nflxext.com/ffe/siteui/vlv3/259422c0-c399-4047-baf2-44bac5612ac1/606e23c4-8fa9-4a06-9f2e-0f4f88746ff3/TH-th-20240819-POP_SIGNUP_TWO_WEEKS-perspective_WEB_4fd9adeb-c3e9-42b1-b9d5-dc152c9ddbca_small.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <div className='size-full rounded-none bg-black bg-opacity-90 px-[68px] py-12 text-white md:h-fit md:w-[420px] md:rounded-[4px]'>
        <LoginSection />
      </div>
    </main>
  )
}
