import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const getProfile = catchAsync(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  return res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export default {
  getProfile,
};
