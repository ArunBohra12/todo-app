import { AUTH_TOKEN_STORAGE_KEY } from '../config/constants';
import axiosRequestInstance, { getAuthorizationHeader } from '../utils/axios';
import handleAsync from '../utils/error';

export const getUserProfile = handleAsync(async () => {
  const { data: responseData } = await axiosRequestInstance({
    url: '/user/profile',
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (responseData.status !== 'success') return [false];

  return [true, responseData.data.user];
});
