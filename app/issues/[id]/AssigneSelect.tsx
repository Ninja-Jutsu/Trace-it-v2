import prisma from '@/prisma/client'
import { buttonStyles } from '@/utils/constants'
import { Select } from '@radix-ui/themes'
import React from 'react'

export default async function AssignSelect() {
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return (
    <Select.Root size='3'>
      <Select.Trigger
        placeholder='Assign Issue'
        style={buttonStyles}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
