import { useState } from 'react';
import Content from './Content';
import './Home.css';

const Home = ({ username, onLogout }) => {
  const [page, setPage] = useState('home');

  return (
    <div className="home">
      <div className="navbar">
          <a href="/">
          <span className="title">
          💡Behavioral Interview Prep Bank</span>
          </a>

        <div className="user">
          <button
            className="collection-button"
            onClick={(e) => {
              e.preventDefault();
              setPage('collection');
            }}
          >
            {username}&#39;s Question Collection
          </button>
          <button
            className="share-question-button"
            onClick={(e) => {
              e.preventDefault();
              setPage('add');
            }}
          >
            Share Question
          </button>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <Content setPage={setPage} page={page} username={username} />
    </div>
  );
};

export default Home;
