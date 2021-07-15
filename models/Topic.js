const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema({
  topic:String
});

module.exports = mongoose.model('topic', TopicSchema);
