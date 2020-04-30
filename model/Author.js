const mongoose = require('mongoose');

const schema = mongoose.Schema;

const authorSchema = schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', authorSchema);