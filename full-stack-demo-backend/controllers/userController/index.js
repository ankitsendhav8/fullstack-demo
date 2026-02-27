const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.get('/:userId', UserController.getUserDetails);
router.put('/:userId', UserController.updateUserDetails);
router.post('/list', UserController.getUsersList);

module.exports = router;
