const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  name: String,
  size: Number,
  date: String,
  file: String
});

const File = module.exports = mongoose.model('File', FileSchema);
