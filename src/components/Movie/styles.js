import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },

  movieLinks: {
    fontWeight: 'bolder',
    alignItems: 'center',
    textDecoration: 'none',
    // all that are not small devices
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },

  movieImage: {
    borderRadius: '50px',
    height: '250px',
    marginBottom: '20px',
    '&:hover': {
      transform: 'scale(1.10)',
    },
  },
  movieTitle: {
    color: theme.palette.text.primary,
    // add ... if title is long
    textOverflow: 'ellipsis',
    width: '200px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginBottom: 0,
    marginTop: '10px',
    textAlign: 'center',
  },
}));
