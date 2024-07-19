import prisma from '@/prisma/client'
import UserSelector from '../_components/userSelector'
import { Issue } from '@prisma/client'

interface Props {
  issue: Issue
}

export default async function AssignSelect({ issue }: Props) {
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!users) return null

  return (
    <UserSelector
      users={users}
      issue={issue}
    />
  )
}
