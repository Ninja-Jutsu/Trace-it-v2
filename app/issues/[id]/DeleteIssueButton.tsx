'use client'
import { Cross1Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { buttonStyles } from '../../../utils/constants'

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = React.useState(false)
  const router = useRouter()

  async function deleteIssue() {
    try {
      await axios.delete(`/api/issues/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setError(true)
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
                onClick={deleteIssue}
                color='tomato'
                style={buttonStyles}
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            <Flex gap='3'>
              <Text>Failed to delete the issue! Try again later.</Text>
              <AlertDialog.Action>
                <Button
                  color='gray'
                  variant='soft'
                  style={buttonStyles}
                  onClick={() => {
                    setError(false)
                  }}
                >
                  Back
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
