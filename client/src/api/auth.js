import { GENERIC_ERROR_MESSAGE } from '../config/constants';
import axiosRequestInstance from '../utils/axios';
import handleAsync from '../utils/error';

export const signup = handleAsync(async ({ name, email, password, confirmPassword }) => {
  if (!name || !email || !password) {
    throw new Error('Please provide all the details.');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.');
  }

  const response = await axiosRequestInstance({
    url: '/auth/signup',
    method: 'POST',
    data: {
      name,
      email,
      password,
      confirmPassword,
    },
  });

  if (response.data.status !== 'success') {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  return response.data.data;
});

export const login = handleAsync(async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Please provide all the details.');
  }

  const response = await axiosRequestInstance({
    url: '/auth/login',
    method: 'POST',
    data: { email, password },
  });

  if (response.data.status !== 'success') {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  return response.data.data;
});
