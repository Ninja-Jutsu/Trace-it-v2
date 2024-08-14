import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'
// this does exactly as importing middleware and then exporting it

export const config = {
  // * = zero or more params
  // +: one or more
  // ?: zero or one
  matcher: ['/issues/:id/edit', '/issues/list'],
}
