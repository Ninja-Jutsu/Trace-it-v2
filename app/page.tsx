import prisma from '@/prisma/client'
import IssuesSummary from './IssuesSummary'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

interface Props {
  searchParams: { page: string }
}

export default async function Home({ searchParams: { page } }: Props) {
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  })
  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  })

  const inProgress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS',
    },
  })

  return (
    <Grid
      columns={{ initial: '1', md: '2' }}
      gap='5'
    >
      <Flex
        direction='column'
        gap='5'
      >
        <IssuesSummary
          open={open}
          closed={closed}
          inProgress={inProgress}
        />
        <IssueChart
          open={open}
          closed={closed}
          inProgress={inProgress}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
