import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

const linkStyles = { width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }
