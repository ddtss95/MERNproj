import React, { useState } from 'react';
import axios from 'axios';

function ShowArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/getArticles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10초 후에 버튼 다시 활성화
  };

  return (
    <div>
      <h2>Articles</h2>
      <button onClick={fetchArticles} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Articles'}
      </button>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <p>Press: {article.press}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
}

export default ShowArticles;