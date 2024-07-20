import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import Link from 'next/link'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface Props {
  issues: Issue[]
  searchParams: IssueQuery
}

export default function IssueTable({ issues, searchParams }: Props) {
  return (
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
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
]

export const columnsNames = columns.map((column) => column.value)
