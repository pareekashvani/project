const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { startAttempt, submitAttempt } = require('../controllers/attempt.controller');

router.use(protect);

router.post('/start/:id', startAttempt);
router.post('/submit/:id', submitAttempt);

module.exports = router;
