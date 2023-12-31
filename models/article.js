const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  press: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article