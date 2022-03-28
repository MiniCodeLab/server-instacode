const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, maxlength: 300 },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Code', schema);
