import { ENV_MODE, GENERIC_ERROR_MESSAGE } from '../config/constants';
import { errorToast } from './toast';

const handleAxiosError = error => {
  const errorMessage = error.response.data.message || GENERIC_ERROR_MESSAGE;

  errorToast(errorMessage);
};

/**
 * The function "handleAsync" takes in an asynchronous function and returns a new function that handles
 * any errors that may occur when the original function is called.
 *
 * USAGE: Wrap any async function with handleAsync and this function will handle all the errors that occour
 *        using custom logic.
 */
const handleAsync = asyncFunc => {
  return async (...args) => {
    try {
      return await asyncFunc(...args);
    } catch (error) {
      if (error.isAxiosError) {
        handleAxiosError(error);
        return;
      }

      if (ENV_MODE !== 'production') {
        console.error(error);
      }

      errorToast(error.message || GENERIC_ERROR_MESSAGE);
    }
  };
};

export default handleAsync;
