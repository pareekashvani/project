const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true },
    marks: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model('Question', questionSchema);
