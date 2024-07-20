import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'

interface Props {
  searchParams: { page: string }
}

export default function Home({ searchParams: { page } }: Props) {
  return (
    <>
      <div>Hello Ismail</div>
      <LatestIssues />
    </>
  )
}
