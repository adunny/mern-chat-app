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

  postMessage(username, message, token) {
    return axios.post(
      "/api/messages",
      { username, messageText: message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default new ApiService();
