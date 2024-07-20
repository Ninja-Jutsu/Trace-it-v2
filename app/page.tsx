import prisma from '@/prisma/client'
import IssuesSummary from './IssuesSummary'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'

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
    <>
      <IssueChart
        open={open}
        closed={closed}
        inProgress={inProgress}
      />
    </>
  )
}
