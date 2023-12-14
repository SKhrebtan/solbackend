const fs = require('fs').promises;
const { catchAsync } = require('../helpers');

exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const usersDB = await fs.readFile('models.json');
  const users = JSON.parse(usersDB);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      msg: 'User is not found!',
    });
  }

  req.user = user;
  req.users = users;
  next();
});
