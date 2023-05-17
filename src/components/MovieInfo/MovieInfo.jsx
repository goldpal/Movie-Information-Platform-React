import React, { useState, useEffect } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Remove,
  ArrowBack,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {
  useGetSingleMovieQuery,
  useGetRecommendatedMoviesQuery,
  useGetListQuery,
} from '../../services/TMDB';
import { selectCategory } from '../../features/currentCategory';
import useStyles from './styles';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';

function MovieInfo() {
  // useParams shall be on top!
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchedListed, setIsMovieWatchedListed] = useState(false);

  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchListMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data, isFetching, error } = useGetSingleMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendatedMoviesQuery({
      movie_id: id,
      list: 'recommendations',
    });
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const sizeofButtons = smallScreen ? 'small' : 'medium';

  //  !! {} -> false -> true
  // !! '' -> true-> false
  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchedListed(
      !!watchListMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchListMovies, data]);
  // hooks inside functions are not allowed
  const addToFavorite = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      { media_type: 'movie', media_id: id, favorite: !isMovieFavorited }
    );
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      { media_type: 'movie', media_id: id, watchlist: !isMovieWatchedListed }
    );
    setIsMovieWatchedListed((prev) => !prev);
  };

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
        <Link to="/">There is an error.</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.spaceAroundContainer}>
      <Grid
        item
        sm={12}
        lg={4}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <img
          className={classes.moviePoster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}
          `}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h4" gutterBottom align="center">
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.spaceAroundContainer}>
          <Box display="flex" align="center">
            <Rating readOnly precision={0.1} value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '20px' }}
            >
              {Math.round(data?.vote_average * 10) / 10} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min{' '}
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genreContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectCategory(genre.id))}
            >
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '1rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (cast, index) =>
                  cast.profile_path && (
                    <Grid
                      item
                      container
                      component={Link}
                      to={`/actors/${cast.id}`}
                      key={index}
                      xs={4}
                      md={2}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                        alt={cast.name}
                      />
                      <Typography color="textPrimary">{cast?.name}</Typography>
                      <Typography color="textSecondary">
                        {cast.character.split('/'[0])}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item style={{ marginTop: '2rem' }} container>
          <div className={classes.buttonsContainer}>
            <Grid className={classes.buttonContainer} item xs={12} sm={6}>
              <ButtonGroup size={sizeofButtons} variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid className={classes.buttonContainer} item xs={12} sm={6}>
              <ButtonGroup
                className={classes.buttonGroup}
                size={sizeofButtons}
                variant="outlined"
              >
                <Button
                  href="#"
                  onClick={addToFavorite}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  href="#"
                  endIcon={isMovieWatchedListed ? <Remove /> : <PlusOne />}
                >
                  {isMovieWatchedListed ? 'WatchList' : 'Watchlist'}
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main', border: '1px solid' }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    variant="inherit"
                    color="inherit"
                    style={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h4" gutterBottom align="center">
          You might like
        </Typography>
        {recommendations ? (
          <MovieList numberOfMovies={8} movies={recommendations} />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            Sorry no recommendation
          </Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        onClose={() => setOpen(false)}
        className={classes.modal}
        open={open}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            className={classes.video}
            frameBorder="0"
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInfo;
