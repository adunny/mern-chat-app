import decode from "jwt-decode";

class AuthService {
  login(token) {
    localStorage.setItem("id_token", token);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getUserInfo() {
    return decode(this.getToken());
  }
}

export default new AuthService();
