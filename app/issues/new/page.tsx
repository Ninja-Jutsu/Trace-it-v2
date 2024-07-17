'use client'
import React from 'react'
import { TextArea, TextField, Button, Callout } from '@radix-ui/themes'

import dynamic from 'next/dynamic' // to lazy load a heavy compo
import 'easymde/dist/easymde.min.css'

import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>()
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
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>loading...</p>,
})

interface IssueForm {
  title: string
  description: string
}
