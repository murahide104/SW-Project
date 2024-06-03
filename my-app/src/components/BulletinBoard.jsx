import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import '../assets/scss/BulletinBoard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPath, setCurrentPath] = useState('Folder01 > Folder01-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const postsPerPage = 10;

  const handleAddPost = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postElement = document.createElement('div');
    postElement.style.width = '800px';
    postElement.style.padding = '20px';
    postElement.style.border = '1px solid #ddd';
    postElement.innerHTML = `<h2>${title}</h2><p>${content}</p><p>작성자: ${author}</p>`;
    
    document.body.appendChild(postElement);  // 必要に応じて一時的にDOMに追加します
    const canvas = await html2canvas(postElement, { logging: false, useCORS: true });
    document.body.removeChild(postElement);  // 描画後に削除します

    const imageData = canvas.toDataURL('image/jpeg');
    const newPost = {
      id: posts.length + 1,
      title,
      image: imageData,
      author,
      date: new Date().toISOString().slice(0, 19).replace('T', ' | '),
      favorite: false,
    };
    setPosts([newPost, ...posts]);
    setShowForm(false);
    setTitle('');
    setContent('');
    setAuthor('');
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
    setCurrentPage(1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
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
          {showForm && (
            <div className="post-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  placeholder="내용"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="작성자"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
                <button type="submit">작성</button>
              </form>
            </div>
          )}
          <div className="table-box">
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
                        <FontAwesomeIcon
                          icon={post.favorite ? faStar : faStarO}
                          onClick={() => toggleFavorite(post.id)}
                          className={post.favorite ? 'favorite' : ''}
                        />
                        <span className="post-title" onClick={() => handleImageClick(post.image)}>{post.title}</span>
                    </td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
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
          <div className="Pagination">
            <button
              className="Pagination-Item-Link Pagination-Item-Link-Icon prev"
              onClick={prevPage}
              disabled={currentPage === 1}
            ></button>
            {[...Array(Math.max(1, Math.ceil(filteredPosts.length / postsPerPage))).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`Pagination-Item-Link Pagination-Item-Link-number ${currentPage === number + 1 ? 'isActive' : ''}`}
              >
                {number + 1}
              </button>
            ))}
            <button
              className="Pagination-Item-Link Pagination-Item-Link-Icon next"
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
            ></button>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={handleCloseImage}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="게시물 이미지" />
        </div>
      )}
    </div>
  );
};

export default BulletinBoard;
