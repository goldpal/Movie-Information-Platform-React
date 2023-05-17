import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import useStyles from './styles';

function Movie({ movie, index }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className={classes.movie}>
      {/* each rows shows after 300 , 600, 900... */}
      <Grow in key={index} timeout={(index + 1) * 300}>
        <Link className={classes.movieLinks} to={`/movie/${movie.id}`}>
          <img
            className={classes.movieImage}
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                : 'https://imgur.com/xvpUHUd'
            }
          />
          <Typography variant="h6" className={classes.movieTitle}>
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${Math.round(movie.vote_average * 10) / 10} / 10`}
          >
            <div>
              {/* movie.vote_average returns a out of 10 value */}
              <Rating value={movie.vote_average / 2} readOnly precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
