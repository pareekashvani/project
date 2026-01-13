const Result = require('../models/Result.model');
const { successResponse } = require('../utils/response.util');

// Admin: View all results
exports.getAllResults = async (req, res, next) => {
    try {
        const results = await Result.find()
            .populate('candidateId', 'name email')
            .populate('assessmentId', 'title')
            .sort('-evaluatedAt');
        successResponse(res, 200, 'All results retrieved', results);
    } catch (error) {
        next(error);
    }
};

// Candidate: View own results
exports.getMyResults = async (req, res, next) => {
    try {
        const results = await Result.find({ candidateId: req.user._id })
            .populate('assessmentId', 'title')
            .sort('-evaluatedAt');
        successResponse(res, 200, 'My results retrieved', results);
    } catch (error) {
        next(error);
    }
};
