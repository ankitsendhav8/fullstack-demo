const { Router } = require('express');
const AuthController = require('./auth.controller');

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
