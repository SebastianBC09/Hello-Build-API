const { Router } = require('express');
const { jwtCheck } = require('../config/auth0');
const {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  listRepositories,
  searchRepositories
} = require('../controllers/githubController');
const router = Router();

router.get('/repositories', jwtCheck, listRepositories);
router.get('/search', jwtCheck, searchRepositories);
router.get('/favorites', jwtCheck, getUserFavorites);
router.post('/favorites/:repoId', jwtCheck, addToFavorites);
router.delete('/favorites/:repoId', jwtCheck, removeFromFavorites);

module.exports = router;
