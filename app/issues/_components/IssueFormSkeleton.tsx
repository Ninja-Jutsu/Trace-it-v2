import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

export default function LoadingNewPage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton
        height={'2rem'}
        className='mb-3'
      />
      <Skeleton height={'25rem'} />
    </Box>
  )
}
