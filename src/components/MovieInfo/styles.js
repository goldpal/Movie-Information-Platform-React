import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  spaceAroundContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  moviePoster: {
    borderRadius: '50px',
    boxShadow: '0.5em 0.8em 1em rgb(0, 0, 0, 0.5)',
    marginBottom: '30px',
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      height: '80%',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
    },
  },
  genreContainer: {
    margin: '10px 0 !important',
    display: 'flex',

    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',

    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  castImage: {
    width: '100%',
    maxWidth: '5em',
    objectFit: 'cover',
    borderRadius: '50px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

  modal: {
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '50%',
    height: '50%',

    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
  buttonGroup: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
}));
