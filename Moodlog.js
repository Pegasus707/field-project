// backend/models/Moodlog.js
const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  stress: { type: Number, required: true },
  sleep: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);
