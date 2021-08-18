import axios from 'axios';

const ENDPOINT = 'http://localhost:3001/users';

export async function register(credentials) {
  try {
    const response = await axios.post(ENDPOINT, credentials);

    return { user: response.data.user, message: response.data.message };
  } catch(err) {
    return { user: null, message: err.response?.data?.message };
  }
}

export async function login(credentials) {
  try {
    const response = await axios.post(ENDPOINT + "/login", credentials);

    window.localStorage.setItem("token", response.data.token);
    return { user: response.data.user };
  } catch(err) {
    console.log(err);
    return { user: null, message: err.response?.data?.message };
  }
}

export async function verifyToken() {
  try {
    await axios.get(ENDPOINT + "/verify", { 
      headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    });

    return true;
  } catch(err) {
    return false;
  }
}
