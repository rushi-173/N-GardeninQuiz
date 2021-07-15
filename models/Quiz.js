const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  topic:String,
  question:String,
  correct_answer: String,
  incorrect_answers: [],
  explanation: String
});

module.exports = mongoose.model('quiz', QuizSchema);
