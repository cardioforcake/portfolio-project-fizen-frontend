import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { register, login, verifyToken } from '../../utils/users-api';
import { createGoal, getAllGoals } from '../../utils/goals-api';

export default function LoginPage(props){
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const { user, message } = await login(formData);

    if (user) {
      props.setUser(user);
      props.loadGoals();
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
      setMessage("");
    } else {
      setMessage(message);
    }
  }

  return(
    <div>
      <h1>LoginPage</h1>
      user: {props.user?.name}<br/>
      message: {message}<br/>
      <form
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <TextField
          label="username" 
          value={formData.name}
          onChange= {(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="password" 
          value={formData.password}
          type="password"
          onChange= {(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => verifyToken()
                          .then(result => result ? setMessage("Token Valid.")
                                                 : setMessage("Token Invalid."))}
        >
          Verify
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            console.log(await createGoal({
              title: "car",
              targetDate: "2020-10-10",
              targetAmount: 2000,
              currentAmount: 50,
              riskTolerance: 3,
            }));
          }}
        >
          TEST GOAL
        </Button>
      </form>
    </div>
  );
}
