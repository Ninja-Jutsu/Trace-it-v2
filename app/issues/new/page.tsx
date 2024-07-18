import dynamic from 'next/dynamic'
import LoadingNewPage from '../_components/IssueFormSkeleton'

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
  loading: () => <LoadingNewPage />,
})

export default function NewIssuePage() {
  return <IssueForm />
}
