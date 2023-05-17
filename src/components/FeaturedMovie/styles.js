import { makeStyles } from '@mui/styles';

// return an object with the styles
export default makeStyles((theme) => ({
  featuredMovieContainer: {
    height: '400px',
    textDecoration: 'none',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  cardRoot: {
    position: 'relative',
  },
  cardMedia: {
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    width: '100%',
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  cardContent: {
    color: '#fff',
    display: 'flex',
    width: '65%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardContentRoot: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
}));
