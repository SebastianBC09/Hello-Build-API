const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const { login, handleCallback, logout,getProfile } = require('../controllers/authController');
const router = Router();

router.get('/login', login);

router.get('/callback', handleCallback);

router.get('/profile', jwtCheck, getProfile);

router.get('/logout', jwtCheck, logout);

router.get('/status', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: "Authentication status check"
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
