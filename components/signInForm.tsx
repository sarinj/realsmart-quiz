'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'

interface SignInFormProps {
  onRegister: () => void
}

export default function SignInForm({ onRegister }: SignInFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

  const formSchema = z.object({
    username: z.string().refine(
      value => {
        return emailRegex.test(value) || phoneRegex.test(value)
      },
      {
        message: 'Please enter a valid email or phone number.',
      }
    ),
    password: z
      .string()
      .min(4, {
        message: 'Your password must contain between 4 and 60 characters.',
      })
      .max(60, {
        message: 'Your password must contain between 4 and 60 characters.',
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function handleLogin(data: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const resp = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      })

      if (resp?.error) {
        setError('Invalid credentials')
        return
      }

      router.push('/home')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className='min-w-[230px]' onSubmit={form.handleSubmit(handleLogin)}>
        <h1 className='mb-7 text-[32px] font-bold'>Sign In</h1>
        {error && (
          <div className='mb-4 rounded-[4px] bg-orange p-5 text-sm text-black'>
            {error}
          </div>
        )}
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email or phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-8 w-full' isLoading={loading}>
          Sign In
        </Button>
        <div className='text-gray-2 mt-3 flex items-center justify-between text-xs'>
          <Label className='flex items-center gap-1 text-xs'>
            <Input className='size-4' type='checkbox' />
            <p>Remember me</p>
          </Label>
          <p>Need help?</p>
        </div>
        <p className='mt-5 text-[14px] text-gray'>
          New to Netflix ?{' '}
          <span className='cursor-pointer text-white' onClick={onRegister}>
            Sign up now
          </span>
          .
        </p>
        <p className='mt-2 text-xs text-gray'>
          This page is protect by Google reCAPTCHA to ensure you&#39;re not a
          bot.{' '}
          <span className='cursor-pointer text-blue hover:underline'>
            Learn more.
          </span>
        </p>
      </form>
    </Form>
  )
}
