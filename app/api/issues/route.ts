import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '@/app/zod/zod-schema'
import prisma from '../../../prisma/client'

interface Issue {
  title: string
  description: string
}
export async function POST(req: NextRequest) {
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
