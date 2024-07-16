import { Box, Skeleton } from '@mui/material'

export default function TableSkeleton() {
  return (
    <Box width={'100%'} paddingX={3}>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
    </Box>
  )
}
export function TableSkeleton2() {
  return (
    <Box width={'100%'} display={'flex'} gap={5} paddingX={3}>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
      <Skeleton animation="wave" width="100%" height={90}></Skeleton>
    </Box>
  )
}
