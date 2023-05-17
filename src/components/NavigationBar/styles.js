import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      flexWrap: 'wrap',
    },
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2), // 8*2 = 16px

    // hide the button if it bigger than sm (mobile)
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      // using a variable to make the drawer width dynamic
      width: '240px',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: '240px',
  },
}));
