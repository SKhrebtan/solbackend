const fs = require('fs').promises;
const uuid = require('uuid').v4;
const { catchAsync } = require('../helpers');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, year } = req.body;
  const newUser = {
    name,
    year,
    id: uuid(),
  };

  const usersDB = await fs.readFile('models.json');
  const users = JSON.parse(usersDB);
  users.push(newUser);
  await fs.writeFile('models.json', JSON.stringify(users));
  res.status(201).json({
    msg: 'Success!!',
    user: newUser,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const usersDB = await fs.readFile('models.json');
  const users = JSON.parse(usersDB);

  res.status(200).json({
    msg: 'Success!',
    users,
  });
});

exports.getUser = (req, res) => {
  const { user } = req;
  res.status(200).json({
    msg: 'Success!',
    user,
  });
};

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user, users } = req;
  const newUsers = users.filter((item) => item.id !== user.id);
  await fs.writeFile('models.json', JSON.stringify(newUsers));
  res.status(200).json({
    msg: 'Success!',
    newUsers,
  });
});

exports.patchUser = catchAsync(async (req, res, next) => {
  const { user, users } = req;
  const { name, gender } = req.body;
  const newUsers = users.filter((item) => item.id !== user.id);
  user.name = name;
  user.gender = gender;
  newUsers.push(user);
  await fs.writeFile('models.json', JSON.stringify(newUsers));
  res.status(200).json({
    msg: 'Success!',
    user,
  });
});
