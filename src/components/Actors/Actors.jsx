import React, { useState } from 'react';
import { Box, CircularProgress, Grid, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import MovieList from '../MovieList/MovieList';
import {
  useGetActorInformationQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';

function Actors() {
  const { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorInformationQuery(id);
  const { data: movies } = useGetMoviesByActorQuery({ id, page });
  const navigate = useNavigate();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="6rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Go back to previous page
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3} className={classes.spaceAroundContainer}>
        <Grid
          item
          sm={12}
          lg={4}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}
        `}
            className={classes.actorImage}
            alt={data?.name}
          />
        </Grid>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          item
          lg={7}
          xl={8}
        >
          <Typography variant="h4" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography align="justify" variant="body1" paragraph>
            {data?.biography || 'No biography available'}
          </Typography>
          <Box marginTop="1rem" display="flex" justifyContent="space-around">
            <Button
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="1rem 0" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={8} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
}

export default Actors;
