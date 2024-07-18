import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { linkStyles, buttonStyles } from '../../../utils/constants'

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button style={buttonStyles}>
      <Link
        href={`/issues/${issueId}/edit`}
        style={linkStyles}
      >
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  )
}
