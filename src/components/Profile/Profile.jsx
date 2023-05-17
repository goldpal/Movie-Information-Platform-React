import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

function Profile() {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchListMovies, refetch: refetchWatchListed } =
    useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    });
  const logout = () => {
    localStorage.clear();

    // reload the page
    window.location.href = '/';
  };

  useEffect(() => {
    refetchFavorites();
    refetchWatchListed();
  }, []);

  return (
    <Box style={{ padding: '0 20px' }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Sign Out & <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results.length && !watchListMovies?.results?.length ? (
        <Typography variant="h5">Add favorites or watch movies</Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watch List Movies" data={watchListMovies} />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
