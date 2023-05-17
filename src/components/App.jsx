import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Actors from './Actors/Actors';
import Movies from './Movies/Movies';
import MovieInfo from './MovieInfo/MovieInfo';
import NavigationBar from './NavigationBar/NavigationBar';
import Profile from './Profile/Profile';

import useStyles from './styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {/* Movie not loading after approved, fixed */}
          {['/', '/approved'].map((path) => (
            <Route path={path} element={<Movies />} key={path} />
          ))}
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
