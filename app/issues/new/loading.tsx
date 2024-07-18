import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

export default function LoadingNewIssue() {
  return (
    <Box className='max-w-xl'>
      <Skeleton height={'2rem'} />
      <Skeleton height={'20rem'} />
    </Box>
  )
}
