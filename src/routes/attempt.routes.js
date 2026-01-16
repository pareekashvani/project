const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
  startAttempt,
  submitAttempt
} = require('../controllers/attempt.controller');

// ONLY CANDIDATE
router.use(authMiddleware);
router.use(roleMiddleware('CANDIDATE'));

router.post('/start/:id', startAttempt);
router.post('/submit/:id', submitAttempt);

module.exports = router;
