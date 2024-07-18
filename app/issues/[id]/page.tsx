import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

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
    <Grid
      columns={{ initial: '1', md: '2' }}
      gap='3'
      width='auto'
    >
      <Box>
        <Heading
          as='h1'
          weight='bold'
        >
          {issue.title}
        </Heading>
        <Flex
          gap='3'
          my='2'
        >
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose mt-4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button style={{ padding: '0px' }}>
          <Link
            href={`/issues/${issue.id}/edit`}
            style={linkStyles}
          >
            <Pencil2Icon />
            Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  )
}

const linkStyles = { width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }
