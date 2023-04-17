import axios from 'axios';
import { SERVER_URL } from '../config/constants';

const serverRequestInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 12000,
});

export default serverRequestInstance;
