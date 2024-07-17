import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '../../../prisma/client'

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required'),
})

interface Issue {
  title: string
  description: string
}
export async function POST(req: NextRequest) {
  const body = await req.json()

  const validation = createIssueSchema.safeParse(body)

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
