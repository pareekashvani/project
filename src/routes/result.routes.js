const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const { getAllResults } = require('../controllers/result.controller');

// ONLY ADMIN
router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

router.get('/', getAllResults);

module.exports = router;
