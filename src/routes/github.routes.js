const router = require('express').Router();
const { getRepositories, searchRepositories } = require('../controllers/github.controller');
const authMiddleware = require('../middleware/auth');

router.get('/repositories', authMiddleware, getRepositories);
router.get('/repositories/search', authMiddleware, searchRepositories);

module.exports = router;
