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
    // console.log(error);

    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export default {
  signup,
};
