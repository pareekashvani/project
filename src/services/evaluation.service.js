const Question = require('../models/Question.model');

const evaluateAssessment = async (assessmentId, submittedAnswers) => {
    // Determine total questions to verify completeness if needed, 
    // but here we just calculate score based on submitted answers.

    // Fetch all questions for this assessment
    const questions = await Question.find({ assessmentId: assessmentId });

    // Map for O(1) access
    const questionMap = new Map();
    questions.forEach(q => questionMap.set(q._id.toString(), q));

    let totalScore = 0;
    // Calculate Score
    submittedAnswers.forEach(ans => {
        const question = questionMap.get(ans.questionId.toString());
        // Check if question exists and correct option matches
        if (question && question.correctOptionIndex === ans.selectedOptionIndex) {
            totalScore += question.marks;
        }
    });

    return totalScore;
};

module.exports = { evaluateAssessment };
