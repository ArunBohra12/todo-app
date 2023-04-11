/**
 * A function that takes in another async function and returns a new function that
 * catches any errors thrown by the async function and passes them to the `next` middleware function.
 * This is used in the application to handle async errors in middleware functions.
 *
 * @param {Function} fn - The async function to be wrapped.
 * @returns {Function} A new function that wraps `fn` and catches any errors thrown by it.
 *
 * @example
 *
 * // Import the `catchAsync` function
 * import catchAsync from './path/to/catchAsync.js';
 *
 * // Define an async middleware function
 * const asyncMiddleware = catchAsync(async (req, res, next) => {
 *   // Perform some asynchronous operation
 *   const data = await fetchData();
 *
 *   // Send the response
 *   res.status(200).json({ data });
 * });
 *
 * // Use the middleware function in an Express app
 * app.get('/', asyncMiddleware);
 */
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
