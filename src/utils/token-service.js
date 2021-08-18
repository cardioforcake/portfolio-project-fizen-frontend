function getToken() {
  return window.localStorage.getItem("token");
}

function setToken(token) {
  return window.localStorage.setItem("token", token);
}

function withTokenHeaders() {
    return { 
      headers: {
        "Authorization": getToken(),
      }
    };
}

export {
  getToken,
  setToken,
  withTokenHeaders,
}
