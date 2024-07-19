import authOptions from '@/app/auth/authOptions'
import { issueSchema, patchIssueSchema } from '@/app/zod/zod-schema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  // protect route
  // const session = await getServerSession(authOptions)
  // if (!session) return NextResponse.json({ error: 'not logged in' }, { status: 401 })
  const body = await req.json()
  const { title, description, assignedToUserId } = body

  // Validate the body data
  const validation = patchIssueSchema.safeParse(body)
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

  // check if assigned user exists
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    })
    if (!user) return NextResponse.json({ error: 'User not found!' }, { status: 400 })
  }

  //check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  if (!issue) return NextResponse.json({ error: 'Issue not found!' }, { status: 404 })

  // if all good update new fields
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title, description, assignedToUserId },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  // protect route
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'not logged in' }, { status: 401 })
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!issue) return NextResponse.json({ error: 'Issue not found!' }, { status: 404 })

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(id) },
  })

  return NextResponse.json(deletedIssue)
}
