'use client'
import { TextArea, TextField, Button } from '@radix-ui/themes'
import dynamic from 'next/dynamic' // to lazy load a heavy compo
import 'easymde/dist/easymde.min.css'
const SimpleMDEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>loading...</p>,
})

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title'>
        <TextField.Slot />
      </TextField.Root>
      <SimpleMDEditor placeholder='description' />
      <Button>Submit New Issue</Button>
    </div>
  )
}
