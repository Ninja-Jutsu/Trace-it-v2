'use client'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import styled from 'styled-components'

export default function IssueActions() {
  return (
    <div className='mb-5'>
      <NewButton>
        <AddLink href={'/issues/new'}>New Issue</AddLink>
      </NewButton>
    </div>
  )
}

const NewButton = styled(Button)`
  width: 100px;
  padding: 0;
`
const AddLink = styled(Link)`
  width: 100%;
  padding: 0;
  margin: 0;
`
