import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { register, login, verifyToken } from '../../../../utils/users-api';
import { createGoal, getAllGoals } from '../../../../utils/goals-api';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4rem'
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
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500'
  },
  registerLabel:{
    color: '#356895',
    fontSize: '2rem',
    fontWeight: '500',
    marginBottom: '1.5rem'
  }
}));

export default function Register(props){
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");
  const history = useHistory();

  const classes = useStyles();

  async function callLogin() {
    const { user, message } = await login(formData);

    if (user) {
      props.setUser(user);
      setMessage("");
    } else {
      setMessage(message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const { user, message } = await register(formData);


    if (user) {
      props.setUser(user);
      await callLogin();

      const goalPayload = { ...props.tutParams, progress: props.tutProgress };
      const { goals, message } = await createGoal(goalPayload);

      if (goals) {
        props.setGoals(goals);
        history.push('/dashboard');
      } else {
        setMessage(message);
      }
    } else {
      setMessage(message);
    }
  }

  return(
    <div className={classes.login}>
      <Typography className={classes.registerLabel}>REGISTER</Typography>
      {message ? <Alert className={classes.alert} severity="warning">{message}</Alert> : null}
      <form
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          label="username" 
          variant="outlined"
          margin="normal"
          value={formData.name}
          onChange= {(e) => setFormData({ ...formData, name: e.target.value })}
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
        />
        <Button fullWidth className={classes.footerBtn} variant="contained" color="primary" onClick={handleRegister}>REGISTER</Button>
      </form>
    </div>
  );
}
