import { Grid, Skeleton } from '@mui/material'

export default function ProUserSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item sm={12} md={12}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={'60px'}
        />
      </Grid>
      <Grid item sm={12} md={8}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={'250px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'250px'}
        />
      </Grid>
      <Grid item sm={12} md={12}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'300px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'250px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'250px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'250px'}
        />
      </Grid>
      
    </Grid>
  )
}
