const mongoose = require('mongoose');
const { ATTEMPT_STATUS } = require('../utils/constants');

const attemptSchema = new mongoose.Schema({
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
        selectedOptionIndex: { type: Number, required: true }
    }],
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    status: { type: String, enum: Object.values(ATTEMPT_STATUS), default: ATTEMPT_STATUS.IN_PROGRESS }
});

module.exports = mongoose.model('Attempt', attemptSchema);
