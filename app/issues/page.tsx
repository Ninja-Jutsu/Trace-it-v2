import Link from 'next/link'
import { Button, Table, Badge } from '@radix-ui/themes'
import prisma from '@/prisma/client'

import IssueStatusBadge from '../components/IssueStatusBadge' // custom compo

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()
  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href={'/issues/new'}>New Issue</Link>
        </Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, createdAt, description, title, status }) => (
            <Table.Row key={id}>
              <Table.Cell>
                {title}
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
