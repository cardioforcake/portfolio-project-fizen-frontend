import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import Tutorial from './tutorial/Tutorial';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import {CssBaseline} from '@material-ui/core';

function App() {
  return (
    <div>
      <CssBaseline />
      <header>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/tutorial">
            <Tutorial/>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <LandingPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
