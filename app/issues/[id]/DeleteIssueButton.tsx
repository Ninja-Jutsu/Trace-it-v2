'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'
import { buttonStyles } from '../../../utils/constants'

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = React.useState('')
  const router = useRouter()
  async function handleDelete() {
    try {
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setError('Something failed miserably!')
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            style={buttonStyles}
            color='tomato'
          >
            <Cross1Icon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone
          </AlertDialog.Description>
          <Flex
            className='mt-4'
            gap='3'
          >
            <AlertDialog.Cancel>
              <Button
                variant='soft'
                color='gray'
                style={buttonStyles}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={handleDelete}
                color='tomato'
                style={buttonStyles}
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
