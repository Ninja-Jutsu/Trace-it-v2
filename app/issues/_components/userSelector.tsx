'use client'
import { buttonStyles } from '@/utils/constants'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  users: User[]
  issue: Issue
}

export default function UserSelector({ users, issue }: Props) {
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={async (userId) => {
          try {
            const assignedUser = await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null })
            toast.success(`Issue Assigned to ${assignedUser.data.name}`)
          } catch (error) {
            toast.success('Issue is unassigned')
          }
        }}
      >
        <Select.Trigger
          style={buttonStyles}
          placeholder='Unassigned'
        />
        <Select.Content position='popper'>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={null!}>Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item
                value={user.id!}
                key={user.name}
              >
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster
        position='top-right'
        reverseOrder={false}
      
      />
    </>
  )
}
