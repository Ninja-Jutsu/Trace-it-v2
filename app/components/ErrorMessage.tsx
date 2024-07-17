import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'

// interface Props {
//   children: ReactNode
// } // use PropsWithChildren instead

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null
  return (
    <Text
      color='tomato'
      as='p'
    >
      {children}
    </Text>
  )
}
