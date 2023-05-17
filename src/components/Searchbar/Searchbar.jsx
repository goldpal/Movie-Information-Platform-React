import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, InputAdornment } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';
import { searchMovie } from '../../features/currentCategory';

function Searchbar() {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  // if not on homepage, don't show
  if (location.pathname !== '/') {
    return null;
  }
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          // icon
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Searchbar;
