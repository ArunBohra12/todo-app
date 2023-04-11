import User from '../models/userModel.js';

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: 'Please provide all the details',
      });
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
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: 'Please provide all the details',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Wrong email or password',
      });
    }

    if (!(await user.verifyPassword(user.password, password))) {
      return res.status(400).json({
        status: false,
        message: 'Wrong email or password',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
};

export default {
  signup,
  login,
};
