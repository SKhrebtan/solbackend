const express = require('express');
const uuid = require('uuid').v4;
const cors = require('cors');
const fs = require('fs').promises;
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({
  path: './.env'
});

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log('Hello from MW!!');
  req.time = new Date().toLocaleString('uk-UA');

  next();
});

app.use('/users/:id', async (req, res, next) => {
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

app.get('/ping', (req, res) => {
  res.status(200).json({
    msg: 'pong!',
    data: req.time,
  });
});

app.post('/users', async (req, res) => {
  try {
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
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/users', async (req, res) => {
  try {
    const usersDB = await fs.readFile('models.json');
    const users = JSON.parse(usersDB);
    res.status(200).json({
      msg: 'Success!',
      users,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/users/:id', (req, res) => {
  const { user } = req;
  res.status(200).json({
    msg: 'Success!',
    user,
  });
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { user, users } = req;
    const newUsers = users.filter((item) => item.id !== user.id);
    await fs.writeFile('models.json', JSON.stringify(newUsers));
    res.status(200).json({
      msg: 'Success!',
      newUsers,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
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
  } catch (error) {
    res.sendStatus(500);
  }
});

console.log(process.env.PROJECT_NAME);

const port = 3333;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
