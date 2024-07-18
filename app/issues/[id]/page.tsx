import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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
      columns={{ initial: '1', md: '5' }}
      gap='3'
      width='auto'
    >
      <Box className='lg:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>

      <Box className='mb-auto mt-auto'>
        <Flex
          gap='3'
          direction='column'
          align='center'
          justify='center'
        >
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

const linkStyles = { width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }
