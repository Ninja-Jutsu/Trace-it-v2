import dynamic from 'next/dynamic'
import LoadingNewPage from '../_components/IssueFormSkeleton'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
  loading: () => <LoadingNewPage />,
})

export default async function NewIssuePage() {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) {
    redirect('/api/auth/signin')
  }
  return <IssueForm />
}
