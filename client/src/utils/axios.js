import axios from 'axios';
import { AUTH_TOKEN_STORAGE_KEY, SERVER_URL } from '../config/constants';

export const getAuthorizationHeader = () => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  return {
    Authorization: `Bearer ${token}`,
  };
};

const axiosRequestInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 12000,
});

export default axiosRequestInstance;
