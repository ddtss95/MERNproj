const express = require('express');
const router = express.Router();
const Article = require('../../models/article');

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send('Error fetching articles');
  }
});

module.exports = router;