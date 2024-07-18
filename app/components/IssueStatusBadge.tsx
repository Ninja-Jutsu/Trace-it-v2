import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Status } from '@prisma/client'

// interface Props {
//   status: Status
// }

const statusType: Record<Status, { label: string; color: 'tomato' | 'violet' | 'green' }> = {
  OPEN: {
    label: 'Open',
    color: 'tomato',
  },
  CLOSED: {
    label: 'Closed',
    color: 'green',
  },
  IN_PROGRESS: {
    label: 'In progress',
    color: 'violet',
  },
}

export default function IssueStatusBadge({ status }: { status: Status }) {
  return <Badge color={statusType[status].color}>{statusType[status].label}</Badge>
}
