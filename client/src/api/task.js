import handleAsync from '../utils/error';
import axiosRequestInstance, { getAuthorizationHeader } from '../utils/axios';
import { GENERIC_ERROR_MESSAGE } from '../config/constants';
import { successToast } from '../utils/toast';

export const getAllTasks = handleAsync(async () => {
  const response = await axiosRequestInstance({
    url: '/task',
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (response.data.status !== 'success') {
    return [false];
  }

  return [true, response.data.data.tasks];
});

export const completeTask = handleAsync(async taskId => {
  if (!taskId) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  const response = await axiosRequestInstance({
    url: `/task/complete/${taskId}`,
  });

  if (response.data.status !== 'success') {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  successToast('Task marked as completed');
});
