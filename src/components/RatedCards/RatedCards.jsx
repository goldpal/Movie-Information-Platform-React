import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

function RatedCards({ title, data }) {
  const classes = useStyles();
  return (
    <Box>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, index) => (
          <Movie key={movie.id} movie={movie} index={index} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
