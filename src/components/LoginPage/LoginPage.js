import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Input} from '@material-ui/core/';
import { register, login, verifyToken } from '../../utils/users-api';
import { createGoal, getAllGoals } from '../../utils/goals-api';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  alert: {
    width: '100%'
  },
  password: {
    marginBottom: theme.spacing(4),
  },
  footerBtn:{
    width: '100%',
    borderRadius: '1rem',
    marginTop: '1.5rem',
    marginBottom: '0',
    fontSize: '1rem',
    fontWeight: '500'
  },
  loginFields:{
    borderRadius: '4rem'
  }
}));

export default function LoginPage(props){
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const { user, message } = await login(formData);

    if (user) {
      await props.setUser(user);
      await props.loadGoals();
      setMessage("");
      history.push('/dashboard');
    } else {
      setMessage(message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const { user, message } = await register(formData);

    if (user) {
      props.setUser(user);
      setMessage("");
    } else {
      setMessage(message);
    }
  }

  return(
    <div className={classes.login}>
      {/* <Typography variant="h3">Login</Typography> */}
      {message ? <Alert className={classes.alert} severity="warning">{message}</Alert> : null}
      <form
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          required
          fullWidth
          label="username" 
          variant="outlined"
          margin="normal"
          value={formData.name}
          onChange= {(e) => setFormData({ ...formData, name: e.target.value })}
          className={classes.loginFields}
        />
        <TextField
          className={classes.password}
          required
          fullWidth
          label="password" 
          variant="outlined"
          margin="normal"
          value={formData.password}
          type="password"
          onChange= {(e) => setFormData({ ...formData, password: e.target.value })}
          className={classes.loginFields}
        />
        {props.variant === "register" ?
          <Button fullWidth className={classes.footerBtn} variant="contained" color="primary" onClick={handleRegister}>Register</Button>
          :
          <Button fullWidth className={classes.footerBtn} variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
        }
      </form>
    </div>
  );
}
