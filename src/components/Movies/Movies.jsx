import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';

function Movies() {
  const [page, setPage] = useState(1);
  const { categoryName, searchQuery } = useSelector(
    (state) => state.currentCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    categoryName,
    page,
    searchQuery,
  });

  const largeScreen = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = largeScreen ? '9' : '13';

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="3rem" />
      </Box>
    );
  }
  // if movies don't exist
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="16px">
        <Typography variant="h4">
          No movies found
          <br />
          Search for something else
        </Typography>
      </Box>
    );
  }

  // obscure error message
  if (error) {
    return 'Error fetching movies';
  }
  return (
    <div>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} excludeFirst numberOfMovies={numberOfMovies} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
}

export default Movies;
