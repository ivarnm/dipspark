function getLoggedInUser() {
  const userString = localStorage.getItem("loggedInUser");
  return JSON.parse(userString)[0];
}

export default {
  getLoggedInUser
}