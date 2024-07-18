import React, { ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
  href: string
  children: string
}

export default function Link({ href, children }: Props) {
  return (
    <NextLink
      href={href}
      legacyBehavior
      passHref
    >
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}
