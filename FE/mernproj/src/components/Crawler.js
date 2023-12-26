import React, { useState } from 'react';
import axios from 'axios';

function Crawler() {
  const [message, setMessage] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);

  const handleCrawl = async () => {
    setIsCrawling(true);
    setMessage('Crawling in progress...');

    try {
      await axios.get('/api/crawler');
      setMessage('Crawling completed successfully.');
    } catch (error) {
      console.error('Crawling failed:', error);
      setMessage('Crawling failed.');
    }

    setTimeout(() => {
      setIsCrawling(false);
    }, 10000); // 10초 후에 버튼 다시 활성화
  };

  return (
    <div>
      <h2>News Crawler</h2>
      <p>N뉴스 IT/과학 분야의 기사를 크롤링하여 MongoDB에 저장합니다.</p>
      <button onClick={handleCrawl} disabled={isCrawling}>Start Crawling</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Crawler;