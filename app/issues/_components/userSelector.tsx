'use client'
import { buttonStyles } from '@/utils/constants'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'

interface Props {
  users: User[]
  issue: Issue
}

export default function UserSelector({ users, issue }: Props) {
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null })
      }}
    >
      <Select.Trigger style={buttonStyles} />
      <Select.Content position='popper'>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={undefined!}>Unassigned</Select.Item>
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
  )
}
