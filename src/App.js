import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
