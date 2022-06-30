import axios from "axios";

class ApiService {
  getMessages() {
    return axios.get("/api/messages");
  }

  postLogin(username, password) {
    return axios.post("/api/users/login", { username, password });
  }
}

export default new ApiService();
