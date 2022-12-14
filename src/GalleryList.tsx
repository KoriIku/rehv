import useGalleryList, { UseGalleryListOptions } from './hooks/useGalleryList'
import GalleryCard, { LoadingCard } from './GalleryCard'
import { Box, Button, Grid, Typography } from '@mui/material'



import React from 'react'

export interface GalleryListProps extends UseGalleryListOptions {}
const GalleryList: React.FC<GalleryListProps> = (props) => {

  const { dataSource, inviewRef, isEmpty, isLoadingMore, isReachingEnd } =
    useGalleryList<HTMLButtonElement>(props)

  if (isEmpty)
    return (
      <Box>
        <Typography variant="subtitle2" align="center" gutterBottom>
          {'Search.NoThisFound'}
        </Typography>
      </Box>
    )

  return (
    <>
      <Grid
        container
        wrap="wrap"
        justifyContent="flex-start"
        spacing={2}
      >
        {dataSource.map((o: { gid: React.Key | null | undefined }, i: any) => (
          <Grid item xs key={o.gid} data-index={i}>
            <GalleryCard record={o} />
          </Grid>
        ))}
        {isLoadingMore &&
          Array(25)
            .fill(0)
            .map((_, k) => <LoadingCard key={k} />)}
      </Grid>
      {!isEmpty && (
        <Button ref={inviewRef} fullWidth className="ddd">
          {isReachingEnd
            ? 'ReachEnd'
            : isLoadingMore
            ? ('Loading') + '...'
            : ('More')}
        </Button>
      )}
    </>
  )
}

export default GalleryList
