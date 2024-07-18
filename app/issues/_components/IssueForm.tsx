'use client'
import React, { Suspense } from 'react'
import { TextField, Button, Callout } from '@radix-ui/themes'

// to lazy load SimpleMDEditor (to prevent document not defined error)
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// form validation
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { issueSchema } from '@/app/zod/zod-schema'
import ErrorMessage from '@/app/components/ErrorMessage'

// form submit
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/components/Spinner'
import { Issue } from '@prisma/client'

interface Props {
  issue?: Issue // make it optional because it's only needed on edit page
}

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
      } catch (error) {
        setError('An error has occurred while updating')
      }
    } else {
      try {
        await axios.post('/api/issues', data)
        router.push('/issues')
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
        <Suspense fallback={<p>Loading...</p>}>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')}
          >
            <TextField.Slot />
          </TextField.Root>
        </Suspense>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
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

const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <Skeleton height={'20rem'} />,
})

// interface IssueForm {
//   title: string
//   description: string
// }
//instead
type IssueFormData = z.infer<typeof issueSchema>
