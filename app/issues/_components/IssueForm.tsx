'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import React from 'react'

import { SimpleMdeReact } from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

// form validation
import { z } from 'zod'
import { issueSchema } from '@/app/zod/zod-schema'
import { zodResolver } from '@hookform/resolvers/zod'

// form submit
import axios from 'axios'
import { ErrorMessage, Spinner } from '@/app/components'
import { Issue } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  issue?: Issue // make it optional because it's only needed on edit page
}

type IssueFormData = z.infer<typeof issueSchema>

export default function IssueForm({ issue }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const router = useRouter()
  const [error, setError] = React.useState('')

  const onSubmit = handleSubmit(async (data) => {
    if (issue) {
      try {
        await axios.patch('/api/issues/' + issue.id, data)
        router.push('/issues')
        // await revalidatePath('/issues', 'layout')
        router.refresh()
      } catch (error) {
        setError('An error has occurred while updating')
      }
    } else {
      try {
        await axios.post('/api/issues', data)
        router.push('/issues')
        // await revalidatePath('/issues', 'layout')
        router.refresh()
      } catch (error) {
        setError('An error has occurred')
      }
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
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        >
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMdeReact
              placeholder='description'
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button
          disabled={isSubmitting}
          style={{ cursor: 'pointer' }}
        >
          {issue ? 'Update issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

// const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
//   loading: () => <Skeleton height={'20rem'} />,
// })

// interface IssueForm {
//   title: string
//   description: string
// }
//instead
