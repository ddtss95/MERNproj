const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../../models/article');

router.get('/', async (req, res) => {
  try {
    const newsUrl = 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105';
    const response = await axios.get(newsUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.sh_text').each((i, elem) => {
      articles.push({
        title: $(elem).find('.sh_text_headline').text().trim(),
        summary: $(elem).find('.sh_text_lede').text().trim(),
        press: $(elem).find('.sh_text_press').text().trim()
      });
    });

    // MongoDB에 저장
    await Article.deleteMany({}); // 기존 데이터 삭제
    await Article.insertMany(articles); // 새 데이터 삽입

    res.json({ message: 'Crawling and data storing done successfully.' });
  } catch (error) {
    console.error('Error in crawling:', error);
    res.status(500).send('Error in crawling');
  }
});

module.exports = router;