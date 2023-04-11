import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError('Please provide all the details', 400));
  }

  const userData = {
    name,
    email,
    password,
    confirmPassword,
  };

  const user = await User.create(userData);

  // Prevent to send sensitive data in the result
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide all the details', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Wrong email or password', 400));
  }

  if (!(await user.verifyPassword(user.password, password))) {
    return next(new AppError('Wrong email or password', 400));
  }

  return res.status(200).json({
    status: 'success',
    message: 'Login successful',
  });
});

export default {
  signup,
  login,
};
