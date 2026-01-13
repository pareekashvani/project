const Attempt = require('../models/Attempt.model');
const Assessment = require('../models/Assessment.model');
const Result = require('../models/Result.model');
const { evaluateAssessment } = require('../services/evaluation.service');
const { successResponse, errorResponse } = require('../utils/response.util');

exports.startAttempt = async (req, res, next) => {
    try {
        const { id: assessmentId } = req.params;
        const candidateId = req.user._id;

        // Check if assessment exists and is active
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment || !assessment.isActive) {
            return errorResponse(res, 404, 'Assessment not found or inactive');
        }

        // Check for existing attempt (Prevent re-attempt)
        const existingAttempt = await Attempt.findOne({ assessmentId, candidateId });
        if (existingAttempt) {
            return errorResponse(res, 400, 'You have already attempted this assessment');
        }

        const attempt = await Attempt.create({
            assessmentId,
            candidateId,
            startTime: new Date(),
            status: 'IN_PROGRESS'
        });

        successResponse(res, 201, 'Assessment started', attempt);
    } catch (error) {
        next(error);
    }
};

exports.submitAttempt = async (req, res, next) => {
    try {
        const { id: assessmentId } = req.params;
        const { answers } = req.body;
        const candidateId = req.user._id;

        // Find the active attempt
        const attempt = await Attempt.findOne({
            assessmentId,
            candidateId,
            status: 'IN_PROGRESS'
        });

        if (!attempt) {
            return errorResponse(res, 404, 'No active attempt found for this assessment');
        }

        // Validate time
        const assessment = await Assessment.findById(assessmentId);
        const timeTaken = (new Date() - new Date(attempt.startTime)) / 1000 / 60; // minutes

        // Allow a small buffer (e.g. 2 mins) for latency/network
        if (timeTaken > assessment.duration + 2) {
            attempt.status = 'SUBMITTED';
            attempt.endTime = new Date();
            await attempt.save();
            // In strict mode, we might zero the score or reject. rejecting for now.
            return errorResponse(res, 400, 'Time limit exceeded. Submission rejected or marked as late.');
        }

        // Evaluate
        const score = await evaluateAssessment(assessmentId, answers);
        const percentage = assessment.totalMarks > 0 ? (score / assessment.totalMarks) * 100 : 0;

        // Save Result
        const result = await Result.create({
            assessmentId,
            candidateId,
            score,
            percentage
        });

        // Update Attempt
        attempt.answers = answers;
        attempt.status = 'SUBMITTED';
        attempt.endTime = new Date();
        await attempt.save();

        successResponse(res, 200, 'Assessment submitted successfully', { result });

    } catch (error) {
        next(error);
    }
};
