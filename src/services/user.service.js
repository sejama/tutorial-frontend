import axios from 'axios';
import api from './api';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';


/*class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }*/

    //Update Services with new Axios Interceptors
/*class UserService {
    getPublicContent() {
        return api.get('/test/all');
      }
    
      getUserBoard() {
        return api.get('/test/user');
      }
    
      getModeratorBoard() {
        return api.get('/test/mod');
      }
    
      getAdminBoard() {
        return api.get('/test/admin');
      }
}
export default new UserService();*/
//React Hooks + Redux: Refresh Token
const getPublicContent = () => {
    return api.get("/test/all");
  };
  
  const getUserBoard = () => {
    return api.get("/test/user");
  };
  
  const getModeratorBoard = () => {
    return api.get("/test/mod");
  };
  
  const getAdminBoard = () => {
    return api.get("/test/admin");
  };
  
  const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
  };

export default UserService;