const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { createAssessment, addQuestion } = require('../controllers/assessment.controller');
const { getAllResults } = require('../controllers/result.controller');

// Protect all routes
router.use(protect);
router.use(authorize('ADMIN'));

router.post(
    '/assessments',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('duration', 'Duration is required').isNumeric()
    ],
    createAssessment
);

router.post(
    '/questions',
    [
        check('assessmentId', 'Assessment ID is required').not().isEmpty(),
        check('questionText', 'Question text is required').not().isEmpty(),
        check('options', 'Options must be an array of strings').isArray({ min: 2 }),
        check('correctOptionIndex', 'Correct option index is required').isNumeric()
    ],
    addQuestion
);

router.get('/results', getAllResults);

module.exports = router;
