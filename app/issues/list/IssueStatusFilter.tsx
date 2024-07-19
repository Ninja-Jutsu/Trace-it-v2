import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : ''
        router.push('/issues/list' + query)
      }}
    >
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.label}
            value={status.value || null!}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
