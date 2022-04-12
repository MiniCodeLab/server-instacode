const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SUPPORTED_LANGUAGES } = require('../../constants/supported-languages');

const schema = new Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, enum: SUPPORTED_LANGUAGES, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, maxlength: 300 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Code', schema);
