const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const router = Router();

router.get('/repositories', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'This protected route should get the repositories from the user'
    });
  } catch(error) {
    next(error);
  }
});

router.get('/search', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'This protected route should get the results from the search'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/favorites', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'This protected route should list user favorites repositories'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/favorites', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'This protected route should add the repositorie to favorites'
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/favorites', jwtCheck, (request, response, next) => {
  try {
    response.status(200).json({
      message: 'This protected route should remove repository from favorites'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
