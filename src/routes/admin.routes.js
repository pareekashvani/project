const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const {
    createAssessment,
    addQuestion
} = require('../controllers/assessment.controller');

const {
    getAllResults
} = require('../controllers/result.controller');

// 🔐 Protect all admin routes
router.use(authMiddleware);
router.use(roleMiddleware('ADMIN'));

// Create Assessment
router.post(
    '/assessments',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('duration', 'Duration is required').isNumeric()
    ],
    createAssessment
);

// Add Question
router.post(
    '/questions',
    [
        check('assessmentId', 'Assessment ID is required').not().isEmpty(),
        check('questionText', 'Question text is required').not().isEmpty(),
        check('options', 'Options must be an array').isArray({ min: 2 }),
        check('correctOptionIndex', 'Correct option index is required').isNumeric()
    ],
    addQuestion
);

// View All Results
router.get('/results', getAllResults);

module.exports = router;
