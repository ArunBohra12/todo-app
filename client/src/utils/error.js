import { ENV_MODE } from '../config/constants';
import { errorToast } from './toast';

const GENERIC_ERROR_MESSAGE = 'Sorry, something went wrong';

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
      return await asyncFunc(args);
    } catch (error) {
      if (error.isAxiosError) {
        handleAxiosError(error);
        return;
      }

      if (ENV_MODE === 'production') {
        errorToast(GENERIC_ERROR_MESSAGE);
        return;
      }

      errorToast(error.message || GENERIC_ERROR_MESSAGE);
    }
  };
};

export default handleAsync;
