const router = require('express').Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite
} = require('../controllers/favorites.controller');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, getFavorites);
router.post('/:repoId', authMiddleware, addFavorite);
router.delete('/:repoId', authMiddleware, removeFavorite);

module.exports = router;
