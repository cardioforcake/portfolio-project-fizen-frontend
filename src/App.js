import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import Tutorial from './tutorial/Tutorial'

function App() {
  return (
    <div>
      <header>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/tutorial">
            <Tutorial/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
