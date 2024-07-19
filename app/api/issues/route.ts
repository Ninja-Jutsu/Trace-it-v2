import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '@/app/zod/zod-schema'
import prisma from '../../../prisma/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

interface Issue {
  title: string
  description: string
}
export async function POST(req: NextRequest) {
  // protect route
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'not logged in' }, { status: 401 })

  const body = await req.json()

  const validation = issueSchema.safeParse(body)

  const issue: Issue = {
    title: body.title,
    description: body.description,
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const newIssue = await prisma.issue.create({ data: issue })

  return NextResponse.json(newIssue, { status: 201 })
}
