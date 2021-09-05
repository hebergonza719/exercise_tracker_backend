const mongoose = require('mongoose');
const guest = new mongoose.Schema({
  date: String,
  exercise: String,
  muscle: String,
  sets: String,
  reps: Number,
  weight: Number,
  notes: String
});

module.exports = mongoose.model("Guest", guest);