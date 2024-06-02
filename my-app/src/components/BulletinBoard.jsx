import React, { useState } from 'react';
import '../assets/scss/BulletinBoard.scss';

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPath, setCurrentPath] = useState('Folder01 > Folder01-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: `Folder01-${posts.length + 1}.jpg`,
      author: 'BNSystem',
      date: new Date().toISOString().slice(0, 19).replace('T', ' | '),
      favorite: false,
    };
    setPosts([newPost, ...posts]);
  };

  const toggleFavorite = (id) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, favorite: !post.favorite } : post
    );
    updatedPosts.sort((a, b) => b.favorite - a.favorite || a.id - b.id);
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1); // 検索結果を1ページ目から表示
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <h4>로고가 들어감</h4>
        </div>
      </div>
      <div className="bulletinboard">
        <div className="content">
          <h1>게시판</h1><br />
          <div className="nav-add">
            <nav>
              <span>{currentPath}</span>
            </nav>
            <button className="add-button" onClick={handleAddPost}>글쓰기<span>+</span></button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="table1">제목</th>
                <th className="table2">작성자</th>
                <th className="table3">
                  등록일
                  <button className="options-button">⋮</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(post => (
                <tr key={post.id}>
                  <td>
                    <span
                      className={post.favorite ? 'favorite' : ''}
                      onClick={() => toggleFavorite(post.id)}
                    >
                      ☆
                    </span>
                    <span className="post-title" onClick={() => alert(`Title: ${post.title}`)}>{post.title}</span>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form className="searchForm" onSubmit={handleSearch}>
            <input
              className="searchForm-input"
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="searchForm-submit" type="submit"></button>
          </form>
          <div className="pagination">
            <button onClick={prevPage}>{'<'}</button>
            {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1 ? 'active' : ''}
              >
                {number + 1}
              </button>
            ))}
            <button onClick={nextPage}>{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulletinBoard;
