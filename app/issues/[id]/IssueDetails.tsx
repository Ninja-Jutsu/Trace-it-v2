import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Text, Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Issue } from '@prisma/client'

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex
        gap='3'
        my='2'
      >
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card
        className='prose'
        mt={'4'}
      >
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  )
}
