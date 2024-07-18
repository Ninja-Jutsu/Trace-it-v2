import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

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
