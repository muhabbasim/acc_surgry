import { Grid, Skeleton } from '@mui/material'

export default function UserStatusSkeleton() {
  return (
    <Grid container spacing={3} pt={5}>

      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={12}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'150px'}
        />
      </Grid>
      
    </Grid>
  )
}
