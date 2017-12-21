const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
  name: String,
  size: Number,
  date: Date
});

const File = module.exports = mongoose.model('File', FileSchema);
