const router = require('express').Router();
const { handleCallback, getUserProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

router.post('/callback', handleCallback);
router.get('/user', authMiddleware, getUserProfile);

module.exports = router;
