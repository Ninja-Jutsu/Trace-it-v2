import prisma from '@/prisma/client'
import IssuesSummary from './IssuesSummary'
import LatestIssues from './LatestIssues'

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
      {/* <LatestIssues /> */}
      <IssuesSummary
        open={open}
        closed={closed}
        inProgress={inProgress}
      />
    </>
  )
}
