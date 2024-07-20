import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssignSelect from './AssigneSelect'
import { Metadata } from 'next'
import { cache } from 'react'

interface Props {
  params: {
    id: string
  }
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
)

export default async function IssueDetailsPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions)
  if (typeof parseInt(id) !== 'number') {
    notFound()
  }

  const issue = await fetchUser(parseInt(id))

  if (!issue) notFound()

  return (
    <Grid
      columns={{ initial: '1', md: '5' }}
      gap='3'
      width='auto'
    >
      <Box className='lg:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex
            gap='3'
            direction='column'
            align='center'
            justify='center'
          >
            <AssignSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchUser(parseInt(id))

  const metadata: Metadata = {
    title: issue?.title,
    description: 'Details of issue' + issue?.id,
  }
  return metadata
}
