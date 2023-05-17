import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
  const classes = useStyles();

  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  if (totalPages === 0) {
    return null;
  }
  return (
    <div className={classes.container}>
      <Button
        color="primary"
        onClick={handlePreviousPage}
        type="button"
        className={classes.button}
        variant="contained"
      >
        Prev{' '}
      </Button>
      <Typography variant="h6" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        color="primary"
        type="button"
        onClick={handleNextPage}
        className={classes.button}
        variant="contained"
      >
        Next{' '}
      </Button>
    </div>
  );
}

export default Pagination;
