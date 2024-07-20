import prisma from '@/prisma/client'

//compo
import Pagination from '@/app/components/Pagination'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable from './IssueTable'

// constants:
import { columnsNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Trace-it - Issues List',
  description: 'View all of project issues',
}

interface Props {
  searchParams: IssueQuery
}

export default async function IssuesPage({ searchParams }: Props) {
  // protect query
  const statutes = Object.values(Status)
  const status = statutes.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const sortedBy = columnsNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

  const currentPage = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy: sortedBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({ where })
  return (
    <Flex
      direction='column'
      gap='3'
    >
      <IssueActions />
      <IssueTable
        issues={issues}
        searchParams={searchParams}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </Flex>
  )
}
