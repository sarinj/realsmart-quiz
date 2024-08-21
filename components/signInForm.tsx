'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function SignInForm() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^0?[1-9]\d{1,14}$/

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(v => {
          console.log(v)
        })}
      >
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
                  <Input placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-12 w-full'>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
