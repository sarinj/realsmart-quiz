import NavBar from '@/components/navigation/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}
