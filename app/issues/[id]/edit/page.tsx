import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import LoadingNewPage from '../../_components/IssueFormSkeleton'
import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <LoadingNewPage />,
})

interface Props {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  })

  if (!issue) notFound()
  return <IssueForm issue={issue} />
}
