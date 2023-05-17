import { makeStyles } from '@mui/styles';

// return an object with the styles
export default makeStyles(() => ({
  root: {
    display: 'flex',

    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    padding: '2em 0',
    width: '100%',
    overflow: 'hidden',
  },
}));
