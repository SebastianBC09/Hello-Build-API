const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const { getUserFavorites, addToFavorites, removeFromFavorites } = require('../controllers/githubController');
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

router.get('/favorites', jwtCheck, getUserFavorites);
router.post('/favorites/:repoId', jwtCheck, addToFavorites);
router.delete('/favorites/:repoId', jwtCheck, removeFromFavorites);

module.exports = router;
