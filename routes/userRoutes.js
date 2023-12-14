const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const router = Router();

// router.post('/', userController.createUser);

// router.get('/', userController.getAllUsers);

// router.get('/:id', userMiddleware.checkUserId, userController.getUser);

// router.delete('/:id', userMiddleware.checkUserId, userController.deleteUser);

// router.patch('/:id', userMiddleware.checkUserId, userController.patchUser);

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers);

router.use('/:id', userMiddleware.checkUserId);
router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.patchUser);

module.exports = router;
