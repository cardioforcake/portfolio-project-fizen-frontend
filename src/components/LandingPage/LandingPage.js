import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from "@material-ui/core";
import LoginPage from '../LoginPage/LoginPage'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footerBtn:{
    width: '100%',
    borderRadius: '1rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500'
  },
  center:{
    marginTop: '2rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  logoSize:{
    height: '5rem'
  }
}));

function LandingPage(props){
  const classes = useStyles()
  return(
    <div>
      <Grid
        container
        direction="column"
        // alignItems="center"
        spacing={3}
      >
        <Grid item sm={12}>
          <div className={classes.center}>
              <img src="/fizen.svg" className={classes.logoSize}/>
          </div>

        </Grid>
        <Grid item sm={10}>
        </Grid>
        <Grid item sm={12}>
          <LoginPage
            user={props.user}
            setUser={props.setUser}
            loadGoals={props.loadGoals}
          />
          {/* <Link to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </Link> */}
        </Grid>
        <Grid item sm={12}>
          <Link to="/tutorial" style={{textDecoration: 'none'}}>
            <Button className={classes.footerBtn} variant="contained" color="primary">Get Started</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
