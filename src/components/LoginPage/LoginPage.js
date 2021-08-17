import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { register, login, verifyToken } from '../../utils/users-api';

export default function LoginPage(props){
  const [formData, setFormData] = useState({ name: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();
    login(formData);
  }

  async function handleRegister(e) {
    e.preventDefault();
    register(formData);
  }

  return(
    <div>
      <h1>LoginPage</h1>
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
        <Button variant="contained" color="primary" onClick={() => verifyToken()}>Verify</Button>
      </form>
    </div>
  );
}
