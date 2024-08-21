'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface RegisterFormProps {
  onSignIn: () => void
}

export default function RegisterForm({ onSignIn }: RegisterFormProps) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(v => {
          console.log(v)
        })}
      >
        <h1 className='mb-7 text-[32px] font-bold'>Sign Up</h1>
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
        <Button type='submit' className='mt-8 w-full'>
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
