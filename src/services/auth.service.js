import axios from "axios";
import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:8080/api/auth/";

/*class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}*/
//Update Services with new Axios Interceptors
/*class AuthService {
    login(username, password) {
      return api
        .post("/auth/signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            TokenService.setUser(response.data);
          }
  
          return response.data;
        });
    }
  
    logout() {
      TokenService.removeUser();
    }
  
    register(username, email, password) {
      return api.post("/auth/signup", {
        username,
        email,
        password
      });
    }
  }
  export default new AuthService();
  */
  //React Hooks + Redux: Refresh Token
  const register = (username, email, password) => {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  };
  
  const login = (username, password) => {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
  
        return response.data;
      });
  };
  
  const logout = () => {
    TokenService.removeUser();
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  };

export default AuthService;