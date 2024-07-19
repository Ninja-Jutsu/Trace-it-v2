import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from '@/app/components'
import Link from 'next/link'

//compo
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { status: Status }
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

  const issues = await prisma.issue.findMany({
    where: { status },
  })
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
                <Link href={`/issues/list?orderBy=${column.value}`}>{column.label}</Link>
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
    </div>
  )
}
