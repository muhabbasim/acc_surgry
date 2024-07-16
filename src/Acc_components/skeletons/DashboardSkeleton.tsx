import { Grid, Skeleton } from '@mui/material'

export default function DashboardSkeleton() {
  return (
    <Grid container spacing={3} pt={5}>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave" 
          width="100%"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>
      <Grid item sm={12} md={2}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'160px'}
        />
      </Grid>

      {/* // ============================================ */}
      <Grid item sm={12} md={3}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={3}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      
      {/* // ============================================ */}
      <Grid item sm={12} md={3}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={3}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={'220px'}
        />
      </Grid>
      
    </Grid>
  )
}
