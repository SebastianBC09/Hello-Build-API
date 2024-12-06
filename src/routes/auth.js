const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const { login, handleCallback, logout,getProfile } = require('../controllers/authController');
const router = Router();

router.get('/login', login);
router.get('/callback', handleCallback);
router.get('/status', jwtCheck, checkStatus);
router.get('/profile', jwtCheck, getProfile);
router.get('/logout', jwtCheck, logout);

module.exports = router;
