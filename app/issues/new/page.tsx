'use client'
import React from 'react'
import { TextArea, TextField, Button, Callout, Text } from '@radix-ui/themes'

// to lazy load SimpleMDEditor (to prevent document not defined error)
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'

// form validation
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/zod/zod-schema'
import { z } from 'zod'

// form submit
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const router = useRouter()
  const [error, setError] = React.useState('')

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root
          color='tomato'
          className='mb-5'
        >
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An error has occurred')
          }
        })}
      >
        <TextField.Root
          placeholder='Title'
          {...register('title')}
        >
          <TextField.Slot />
        </TextField.Root>
        {errors.title && (
          <Text
            color='tomato'
            as='p'
          >
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDEditor
              placeholder='description'
              {...field}
            />
          )}
        />
        {errors.description && (
          <Text
            color='tomato'
            as='p'
          >
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>loading...</p>,
})

// interface IssueForm {
//   title: string
//   description: string
// }
//instead
type IssueForm = z.infer<typeof createIssueSchema>
