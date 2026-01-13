const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    percentage: { type: Number, required: true },
    evaluatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
