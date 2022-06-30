import axios from "axios";

class ApiService {
  getMessages() {
    return axios.get("/api/messages");
  }
}

export default new ApiService();
