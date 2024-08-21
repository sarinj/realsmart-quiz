import SignInForm from '@/components/signInForm'

export default function Home() {
  return (
    <main className='flex size-full h-screen items-center justify-center'>
      <div className='w-[450px] rounded-[4px] bg-black px-[68px] py-12 text-white'>
        <h1 className='mb-7 text-[32px] font-bold'>Sign In</h1>
        <SignInForm />
      </div>
    </main>
  )
}
