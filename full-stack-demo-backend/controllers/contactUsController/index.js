const { Router } = require('express');
const ContactUsController = require('./contactus.controller');

const router = Router();
router.post('/', ContactUsController.contactUsDetails);

module.exports = router;
