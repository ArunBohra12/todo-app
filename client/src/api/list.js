import handleAsync from '../utils/error';
import axiosRequestInstance, { getAuthorizationHeader } from '../utils/axios';

export const getAllLists = handleAsync(async () => {
  const response = await axiosRequestInstance({
    url: '/list',
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (response.data.status !== 'success') {
    return [false];
  }

  return [true, response.data.data.lists];
});

export const createList = handleAsync(async listName => {
  if (!listName) {
    throw new Error('Please provide a list name');
  }

  const response = await axiosRequestInstance({
    url: '/list',
    method: 'POST',
    data: {
      name: listName,
    },
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (response.data.status !== 'success') {
    throw new Error("Something went wrong. Can't create the list.");
  }

  return [true, response.data.data.list];
});

export const addTaskToList = handleAsync(async ({ listId, taskId }) => {
  if (!listId || !taskId) {
    throw new Error('Please provide all the details');
  }

  const response = await axiosRequestInstance({
    url: `/list/add-task/${listId}`,
    method: 'POST',
    data: { taskId },
    headers: {
      ...getAuthorizationHeader(),
    },
  });

  if (response.data.status !== 'success') {
    throw new Error("Something went wrong. Can't perform the action.");
  }

  return [true, response.data.data.list];
});
