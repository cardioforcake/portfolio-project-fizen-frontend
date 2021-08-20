import './App.css';
import { useHistory, BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Container, createTheme, CssBaseline, Grid, ThemeProvider, Toolbar } from '@material-ui/core';
import { getAllGoals } from './utils/goals-api';
import { verifyToken } from './utils/users-api';
import { setToken } from './utils/token-service';
import LogoutButton from './components/LogoutButton/LogoutButton';
import Tutorial from './components/Tutorial/Tutorial';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import {AccountCircle} from '@material-ui/icons';

const theme = createTheme({
  palette: {
    primary: {
      main: '#356895',
      // main: '#0e4a81',
      dark: '#033666'
    },
    secondary: {
      main: '#000000',
      dark: '#303030'
    },
    dark:{
      main: 'black'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4),
    backgroundColor: '#edf2f4',
    height: '60px'
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

  const [dummyGoal, setDummyGoal]=useState([{
    title: 'Dummy',
    targetAmount: 150000,
    targetDate: new Date('2041-08-19'),
    currentAmount: 5000,
    riskTolerance: 3,
    cspAmount: 288,
    progress: 1
  }])

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

  async function logout() {
    await Promise.all([
      setUser(null),
      setGoals([]),
      setToken(""),
    ]);
  }

  useEffect(() => {
    (async () => {
      const { user, message } = await verifyToken();
      console.log(user);
      if (user) {
        setUser(user);
        loadGoals();
      }
    })();
  }, []);

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
              <Link to="/">
                <img src="/fizen.svg" alt="logo" height="30px" />
              </Link>
              {
                user ?
                  <div>
                    <Grid container spacing={1}>
                      <Grid item>
                        <LogoutButton logout={logout}/>
                      </Grid>
                      <Grid item>
                        <Link to="/dashboard">
                          <IconButton color="primary" component="span">
                            <AccountCircle fontSize="large" />
                          </IconButton>
                        </Link>
                      </Grid>
                    </Grid>
                  </div>
                  : 
                  <Link to="/login">
                    <Button variant="contained" color="primary">Login</Button>
                  </Link>
              }
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <Switch>
              <Route path="/tutorial">
                <Tutorial
                  setUser={setUser}
                  setGoals={setGoals}
                />
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
                  loadGoals={loadGoals}
                  dummyGoal={dummyGoal} 
                />
              </Route>
              <Route path="/">
                <LandingPage
                  user={user}
                  setUser={setUser}
                  loadGoals={loadGoals}
                />
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
