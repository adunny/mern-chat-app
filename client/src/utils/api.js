import axios from "axios";

class ApiService {
  getMessages() {
    return axios.get("/api/messages");
  }

  postLogin(userData) {
    return axios.post("/api/users/login", userData);
  }

  postUser(userData) {
    return axios.post("/api/users", userData);
  }
}

export default new ApiService();
