const { Types } = require('mongoose');
const { catchAsync, HttpError, userValidators } = require('../helpers');
const { DiscountRequest } = require('../models');

exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isValidId = Types.ObjectId.isValid(id);

  if (!isValidId) throw new HttpError(404, 'User is not found');

  const userExists = await DiscountRequest.findById({ id });

  if (!userExists) throw new HttpError(404, 'User is not found!');

  next();
});

exports.checkUserCreatedExists = catchAsync(async (req, res, next) => {
  const { value, error } = userValidators.createUserDataValidator(req.body);

  if (error) throw new HttpError(400, 'Invalid user data!');
  const userExists = await DiscountRequest.exists({ email: value.email });

  if (userExists) throw new HttpError(409, 'User with this email is already exists..');
  req.body = value;
  next();
});
