const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
