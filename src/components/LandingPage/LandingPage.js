import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from "@material-ui/core";

function LandingPage(){
  return(
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Grid item sm={12}>
          <Typography variant="h2" align="center">Our App Title</Typography>
        </Grid>
        <Grid item sm={10}>
          <div style={{
            width: "400px",
            height: "400px",
            backgroundColor: "goldenrod"
          }}>logo goes here</div>
        </Grid>
        <Grid item sm={10}>
          <Link to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </Link>
        </Grid>
        <Grid item sm={10}>
          <Link to="/tutorial">
            <Button variant="contained" color="primary">Get Started</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
