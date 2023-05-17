import { makeStyles } from '@mui/styles';

// return an object with the styles
export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    margin: '30px 2px',
  },
  pageNumber: {
    margin: '0 40px !important',
    color: theme.palette.text.primary,
  },
}));
