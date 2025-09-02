const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const restrictTo = require('../middleware/restrictTo');

const router = express.Router();

router.use(auth);

router.route('/')
  .get(restrictTo('admin'), getAllUsers);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;