const express = require('express');
const path = require('path');
const crawlerRouter = require('./routes/api/crawler');
const articleRouter = require('./routes/api/getArticles');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use('/api/crawler', crawlerRouter);
app.use('/api/getArticles', articleRouter);

app.use(express.static(path.join(__dirname, '/FE/mernproj/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/FE/mernproj/build/index.html'));
  });


const port = 8080;
app.listen(port, function () {
  console.log('server is listening on 8080')
});