import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Container, CssBaseline, Toolbar } from '@material-ui/core';
import { getAllGoals } from './utils/goals-api';
import Tutorial from './tutorial/Tutorial';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  }
}));

function App() {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [message, setMessage] = useState("");

  const classes = useStyles();

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
          <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
              <Link to="/">
                <Button variant="contained" color="primary">Home</Button>
              </Link>
            {
              user ?
                <Link to="/dashboard">
                  <Button variant="contained" color="primary">
                    Dashboard: {user?.name}
                  </Button>
                </Link>
              : null
            }
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
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
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
