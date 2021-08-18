import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { getAllGoals } from './utils/goals-api';
import Tutorial from './tutorial/Tutorial';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';

function App() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [message, setMessage] = useState("");

  // TODO perhaps this should be in a sync-service?
  async function loadGoals() {
    try {
      const { goals, message } = await getAllGoals();

      if (goals) {
        setGoals(goals);
      } else {
        setMessage(message);
      }
    } catch(err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <header>
          Team Awesome App | user: {user?.name}<br />
          <Link to="/">landingPage</Link>--
          <Link to="/tutorial">tutorial</Link>--
          <Link to="/login">login</Link>--
          <Link to="/dashboard">dashboard</Link>
        </header>
        <hr />
        <Switch>
          <Route path="/tutorial">
            <Tutorial/>
          </Route>
          <Route path="/login">
            <LoginPage
              user={user}
              setUser={setUser}
              loadGoals={loadGoals}
            />
          </Route>
          <Route path="/dashboard">
            <DashboardPage
              user={user}
              goals={goals}
              setGoals={setGoals}
            />
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
