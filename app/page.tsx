import Pagination from './components/Pagination'

export default function Home() {
  return (
    <>
      <Pagination
        currentPage={1}
        itemCount={20}
        pageSize={5}
      />
      <div>Hello Ismail</div>
    </>
  )
}
