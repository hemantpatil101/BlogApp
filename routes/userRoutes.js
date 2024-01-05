const express = require('express');
const { getAllUsers, registerController, loginController } = require('../Controllers/userControllers');

const router = express.Router();

router.get('/all-user',getAllUsers);
router.post('/register',registerController);
router.post('/login',loginController);

module.exports = router;