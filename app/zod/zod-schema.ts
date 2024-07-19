import { z } from 'zod'

// in order to use schemas inside pages and not only routes
// we need to install npm i @hookform/resolvers@3.3.1

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
})

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'Assigned issue is required').max(255).optional().nullable(),
})
