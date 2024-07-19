import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

interface Statuses {
  label: string
  value?: Status // optional
}

const statuses: Statuses[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

export default function IssueStatusFilter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value}
            value={status.value || ' '}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
