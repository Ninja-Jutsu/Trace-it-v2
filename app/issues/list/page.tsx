import { Flex, Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from '@/app/components'
import Link from 'next/link'

//compo
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string }
}

export default async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ]
  // protect query
  const statutes = Object.values(Status)
  const status = statutes.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const sortedBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

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
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column?.className}
              >
                <Flex
                  align='center'
                  gap='1'
                >
                  <Link
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy && <ArrowDownIcon />}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, createdAt, title, status }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </div>
  )
}
