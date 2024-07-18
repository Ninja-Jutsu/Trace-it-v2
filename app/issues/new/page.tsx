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
import ErrorMessage from '@/app/components/ErrorMessage'

// form submit
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'

export default function NewIssuePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const router = useRouter()
  const [error, setError] = React.useState('')

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setError('An error has occurred')
    }
  })

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
        onSubmit={onSubmit}
      >
        <TextField.Root
          placeholder='Title'
          {...register('title')}
        >
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
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
