'use client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import styled from 'styled-components'
import IssueStatusFilter from './IssueStatusFilter'

export default function IssueActions() {
  return (
    <Flex justify='between'>
      <IssueStatusFilter />
      <NewButton>
        <AddLink href={'/issues/new'}>New Issue</AddLink>
      </NewButton>
    </Flex>
  )
}

const NewButton = styled(Button)`
  width: 100px;
  padding: 0;
`
const AddLink = styled(Link)`
  width: 100%;
  /* height: 100%; */
  padding: 1rem;
`
