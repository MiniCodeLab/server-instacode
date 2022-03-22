const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    code: { type: String, unique: true, required: true },
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
