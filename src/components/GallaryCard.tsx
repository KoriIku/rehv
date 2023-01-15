import React from 'react';
import ColorChip from './ColorChip';
import { IndexListItemPorps } from '../interface/gallery';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography/Typography';
import Card from '@mui/material/Card/Card';
import Box from '@mui/system/Box/Box';

type Props = {
  item: IndexListItemPorps
}

const GallaryCard: React.FC<Props> = ({ item }) => {
  return (
    <>
      <Card sx={{}}>
        <Box sx={{
          maxWidth: 360,
          height: 136,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr 1fr 1fr',
          gridTemplateRows: 'auto repeat(4, 1fr)',
          gridTemplateAreas: `
        "thumb  title title title"
        "thumb  uploader uploader uploader"
        "thumb  tag tag tag"
        "thumb  rating    language    pagenumber"
        "thumb  category uploadtime uploadtime"`
        }}>
          <Box sx={{ gridArea: 'thumb' }}><img src={item.thumb} alt={item.title} style={{ width: 95, height: 136, objectFit: 'cover' }} /></Box>
          <Box sx={{ gridArea: 'title' }}><Link to={`/g/${item.gid}/${item.gtoken}`}>
            <Typography
              title={item.title}
              sx={{
                fontSize: '10pt',
                overflow: 'hidden',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
              }}
            >
              {item.title}
            </Typography></Link>
          </Box>
          <Box sx={{ gridArea: 'uploader' }}>{item.uploader}</Box>
          <Box sx={{ gridArea: 'category' }}><ColorChip category={item.category} /></Box>
          <Box sx={{ gridArea: 'uploadtime', justifySelf: 'end', alignSelf: 'center' }}>{item.uploadtime}</Box>
        </Box>
      </Card>
    </>
  );
}

export default GallaryCard;