import jwt from 'jsonwebtoken';
import SmartList from '../models/smartListModel.js';

import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const signJwtAuthToken = data => {
  const token = jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 30,
      ...data,
    },
    process.env.AUTH_JWT_SIGNING_SECRET,
    {
      expiresIn: process.env.AUTH_JWT_EXPIRY,
    }
  );

  return token;
};

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

  // Create smart lists for the user
  const smartLists = ['my-day', 'important'];

  await Promise.all(
    smartLists.map(list => {
      return SmartList.create({
        user: user.id,
        type: list,
      });
    })
  );

  // Prevent to send sensitive data in the result
  user.password = undefined;

  const authToken = signJwtAuthToken({ id: user.id });

  res.status(200).json({
    status: 'success',
    data: {
      token: authToken,
      user,
    },
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

  user.password = undefined;

  const authToken = signJwtAuthToken({ id: user.id });
  return res.status(200).json({
    status: 'success',
    message: 'Login successful',
    data: {
      token: authToken,
      user,
    },
  });
});

const protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AppError("Can't authorize. Invalid token provided", 400));
  }

  const token = authorization.split('Bearer ')[1];
  const authorizationTokenData = jwt.verify(token, process.env.AUTH_JWT_SIGNING_SECRET);

  if (!authorizationTokenData) {
    return next(new AppError('Invalid token', 400));
  }

  const { id: userId } = authorizationTokenData;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError('User not found.', 400));
  }

  if (user.id !== userId) {
    return next(new AppError('Courropt token', 400));
  }

  req.user = user;
  next();
});

export default {
  signup,
  login,
  protect,
};
