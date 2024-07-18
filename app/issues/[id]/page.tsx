import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
  params: {
    id: string
  }
}

export default async function IssueDetailsPage({ params: { id } }: Props) {
  if (typeof parseInt(id) !== 'number') {
    notFound()
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!issue) notFound()

  return (
    <div>
      <Heading as='h1'>{issue.title}</Heading>
      <Flex
        gap='3'
        my='2'
      >
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  )
}
