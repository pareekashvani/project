const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getMyResults } = require('../controllers/result.controller');

router.use(protect);
router.get('/me', getMyResults);

module.exports = router;
