const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');

const sendTokenResponse = (user, statusCode) => {
  const token = user.getSignedJwtToken();

  return { token, statusCode, success: true };
};

module.exports = {
  register: asyncHandler(async (args) => {
    const { name, email, password } = args.user;

    if (!name || !email || !password) {
      return new ErrorResponse('All fields are required', 400);
    }

    const user = await User.create({
      name,
      email,
      password
    });

    return sendTokenResponse(user, 200);
  }),
  login: asyncHandler(async (args) => {
    const { email, password } = args.user;
    if (!email || !password) {
      return new ErrorResponse('Please provide an email and a password', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return new ErrorResponse('Invalid credentials', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return new ErrorResponse('Invalid credentials', 401);
    }

    return sendTokenResponse(user, 200);
  }),
  getMe: asyncHandler(async (args, req) => {
    if (!req.user) {
      return new ErrorResponse('Not authorized to access this route', 401);
    }

    const user = await User.findById(req.user.id);

    return user;
  })
};
