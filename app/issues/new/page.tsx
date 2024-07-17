import { TextArea, TextField, Button } from '@radix-ui/themes'
import React from 'react'

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title'>
        <TextField.Slot />
      </TextField.Root>
      <TextArea placeholder='description' />
      <Button>Submit New Issue</Button>
    </div>
  )
}
