import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: data => axios.post("/api/user", { data }).then(res => res.data.user)
  }
};
