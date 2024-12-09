const router = require('express').Router();
const authRoutes = require('./auth.routes');
const githubRoutes = require('./github.routes');
const favoritesRoutes = require('./favorites.routes');

router.use('/auth', authRoutes);
router.use('/github', githubRoutes);
router.use('/favorites', favoritesRoutes);

module.exports = router;
