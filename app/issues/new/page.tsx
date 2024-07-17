'use client'
import { TextArea, TextField, Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic' // to lazy load a heavy compo
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>loading...</p>,
})

interface IssueForm {
  title: string
  description: string
}

export default function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const router = useRouter()

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
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
  )
}
