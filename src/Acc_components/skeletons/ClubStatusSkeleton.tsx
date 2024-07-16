import { Grid, Skeleton } from '@mui/material'

export default function ClubStatusSkeleton() {
  return (
    <Grid container spacing={3} pt={5}>
      <Grid item sm={12} md={6}>
        <Skeleton
          variant="rounded"
          animation="wave" 
          width="100%"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={12}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
    </Grid>
  )
}
