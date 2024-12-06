const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const router = Router();

router.get('/login', (request, response, next) => {
  try {
    response.status(200).json({
      message: "Redirecting to Auth0 login"
    })
  } catch (error) {
    next(error)
  }
});

router.get('/callback', (request, response, next) => {
  try {
    response.status(200).json({
      message: "Processing Auth0 callback"
    })
  } catch (error) {
    next(error)
  }
});

router.get('/profile', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'Get user profile information'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: "User logged out successfully"
    })
  } catch (error) {
    next(error)
  }
});

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
