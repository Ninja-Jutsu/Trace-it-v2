import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button style={{ padding: '0px' }}>
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

const linkStyles = { width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }
