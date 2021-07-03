const mongoose = require('mongoose');
const log = new mongoose.Schema({
  user_id: String,
  date: String,
  exercise: String,
  muscle: String,
  sets: Number,
  reps: Number,
  weight: Number,
  notes: String
});

module.exports = mongoose.model("Log", log);