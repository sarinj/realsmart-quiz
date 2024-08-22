'use client'

import { useState } from 'react'
import SignInForm from './signInForm'
import RegisterForm from './registerForm'

export default function LoginSection() {
  const [isRegister, setIsRegister] = useState(false)

  return isRegister ? (
    <RegisterForm onSignIn={() => setIsRegister(false)} />
  ) : (
    <SignInForm onRegister={() => setIsRegister(true)} />
  )
}
