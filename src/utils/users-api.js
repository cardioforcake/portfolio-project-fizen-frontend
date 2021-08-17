import axios from 'axios';

const ENDPOINT = 'http://localhost:3001/users';

export async function register(credentials) {
  try {
    const response = await axios.post(ENDPOINT, credentials);

    console.log(response.data.user);
  } catch(err) {
    console.log(err);
  }
}

export async function login(credentials) {
  try {
    const response = await axios.post(ENDPOINT + "/login", credentials);

    console.log(response.data.token);
    window.localStorage.setItem("token", response.data.token);
  } catch(err) {
    console.log(err);
  }
}

export async function verifyToken() {
  try {
    await axios.get(ENDPOINT + "/verify", { 
      headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    });

    console.log("Token is valid.");
    return true;

  } catch(err) {
    return false;
  }
}
