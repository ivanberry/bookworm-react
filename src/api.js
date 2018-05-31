import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/user", { user }).then(res => res.data.user),
    confirm: token =>
      axios.post("/api/auth/confirmation", { token }).then(res => res.data),
    resetPasswordRequest: email =>
      axios
        .post("/api/user/reset_password_request", { email })
        .then(res => res.data.user)
        .catch(err => err.data.errors),
    validateToken: token => axios.post("/api/auth/validate_token", { token })
  }
};
