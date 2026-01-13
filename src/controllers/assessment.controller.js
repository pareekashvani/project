const Assessment = require('../models/Assessment.model');
const Question = require('../models/Question.model');
const { successResponse, errorResponse } = require('../utils/response.util');
const { validationResult } = require('express-validator');

// @desc    Create new assessment
// @route   POST /api/admin/assessments
// @access  Private/Admin
exports.createAssessment = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Validation Error', errors.array());
        }

        const { title, description, duration } = req.body;

        const assessment = await Assessment.create({
            title,
            description,
            duration,
            createdBy: req.user._id
        });

        successResponse(res, 201, 'Assessment created successfully', assessment);
    } catch (error) {
        next(error);
    }
};

// @desc    Add question to assessment
// @route   POST /api/admin/questions
// @access  Private/Admin
exports.addQuestion = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, 400, 'Validation Error', errors.array());
        }

        const { assessmentId, questionText, options, correctOptionIndex, marks } = req.body;

        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            return errorResponse(res, 404, 'Assessment not found');
        }

        const question = await Question.create({
            assessmentId,
            questionText,
            options,
            correctOptionIndex,
            marks: marks || 1
        });

        // Update total marks in assessment
        assessment.totalMarks += (marks || 1);
        await assessment.save();

        successResponse(res, 201, 'Question added successfully', question);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all active assessments
// @route   GET /api/assessments
// @access  Private/Candidate
exports.getAssessments = async (req, res, next) => {
    try {
        const assessments = await Assessment.find({ isActive: true })
            .select('-createdBy')
            .sort('-createdAt');

        successResponse(res, 200, 'Assessments retrieved successfully', assessments);
    } catch (error) {
        next(error);
    }
};

// @desc    Get assessment details (optional)
exports.getAssessmentById = async (req, res, next) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return errorResponse(res, 404, 'Assessment not found');
        }
        successResponse(res, 200, 'Assessment details', assessment);
    } catch (error) {
        next(error);
    }
};
