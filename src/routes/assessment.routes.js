const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
  createAssessment,
  getAssessments
} = require('../controllers/assessment.controller');

// ADMIN creates
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  createAssessment
);

// CANDIDATE views
router.get(
  '/',
  authMiddleware,
  roleMiddleware('CANDIDATE'),
  getAssessments
);

module.exports = router;
