import { AUTH_TOKEN_STORAGE_KEY } from '../config/constants';
import serverRequestInstance from '../utils/axios';
import handleAsync from '../utils/error';

export const getUserProfile = handleAsync(async () => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (!token) {
    return [false];
  }

  const { data: responseData } = await serverRequestInstance({
    url: '/user/profile',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (responseData.status !== 'success') return [false];

  return [true, responseData.data.user];
});
