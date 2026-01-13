const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getAssessments, getAssessmentById } = require('../controllers/assessment.controller');

// Require authentication for listing assessments
router.use(protect);

router.get('/', getAssessments);
router.get('/:id', getAssessmentById);

module.exports = router;
