const express = require('express');
const router = express.Router();
const lineupController = require('../controllers/lineup.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, lineupController.generateLineup);
router.get('/history', authMiddleware, lineupController.getHistory);

module.exports = router;
