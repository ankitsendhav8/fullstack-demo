const { Router } = require('express');
const authRoutes = require('../controllers/authController/index');
const userRoutes = require('../controllers/userController/index');
const contactRoutes = require('../controllers/contactUsController/index');

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
