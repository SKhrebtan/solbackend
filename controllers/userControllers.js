const { catchAsync, userValidators, HttpError, sendEmail } = require('../helpers');
const { DiscountRequest } = require('../models');

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await DiscountRequest.create(req.body);
console.log(newUser.email);
  const sendData = {
    to: newUser.email,
    subject: 'You received discount! Type me "Meow"',
    html: '<strong>Test mail</strong>'
  };

  if (newUser) await sendEmail(sendData);
  res.status(201).json({
    msg: 'Success!!',
    user: newUser,
  });
});

// exports.getAllUsers = catchAsync(async (req, res) => {
//   const usersDB = await fs.readFile('models.json');
//   const users = JSON.parse(usersDB);
//   res.status(200).json({
//     msg: 'Success!',
//     users,
//   });
// });

// exports.getUser = catchAsync(async (req, res) => {
//   const user = await DiscountRequest.findByID(req.params.id);
//   res.status(200).json({
//     msg: 'Success!',
//     user,
//   });
// };

// exports.deleteUser = catchAsync(async (req, res) => {
//   const { user, users } = req;
//   const newUsers = users.filter((item) => item.id !== user.id);
//   await fs.writeFile('models.json', JSON.stringify(newUsers));
//   res.status(200).json({
//     msg: 'Success!',
//     newUsers,
//   });
// });

// exports.patchUser = catchAsync(async (req, res) => {
//   const { user, users } = req;
//   const { name, gender } = req.body;
//   const newUsers = users.filter((item) => item.id !== user.id);
//   user.name = name;
//   user.gender = gender;
//   newUsers.push(user);
//   await fs.writeFile('models.json', JSON.stringify(newUsers));
//   res.status(200).json({
//     msg: 'Success!',
//     user,
//   });
// });
