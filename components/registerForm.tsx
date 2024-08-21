'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'

interface RegisterFormProps {
  onSignIn: () => void
}

export default function RegisterForm({ onSignIn }: RegisterFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^0?[1-9]\d{1,14}$/

  const formSchema = z
    .object({
      name: z.string().min(1, { message: 'Name is required.' }),
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
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm password is required.' }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleRegister(data: z.infer<typeof formSchema>) {
    setLoading(true)
    const temp = {
      name: data.name,
      username: data.username,
      password: data.password,
    }
    try {
      const resp = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      })

      if (resp.ok) {
        const data = await resp.json()
        setSuccess(data.message)
        setTimeout(() => {
          onSignIn()
        }, 800)
      } else {
        const data = await resp.json()
        setError(data.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)}>
        <h1 className='mb-7 text-[32px] font-bold'>Sign Up</h1>
        {error && (
          <div className='mb-4 rounded-[4px] bg-orange p-5 text-sm text-black'>
            {error}
          </div>
        )}
        {success && (
          <div className='mb-4 rounded-[4px] bg-green-600 p-5 text-sm text-white'>
            {success}
          </div>
        )}
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Confirm Password'
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-8 w-full' isLoading={loading}>
          Sign Up
        </Button>
        <p className='mt-2 text-[14px] text-gray'>
          Already have an account ?{' '}
          <span className='cursor-pointer text-white' onClick={onSignIn}>
            Sign in
          </span>
          .
        </p>
      </form>
    </Form>
  )
}
