
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import PostContent from './components/postcontent';
import Post from './components/post'
import Landingpage from './components/landingpage'

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <Router>
      <>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <Routes>
              <Route excat path="/" element={<Landingpage /> } />
              <Route path="/post/:topic" element={<Post posts={posts} setPosts={setPosts} />} />
              <Route path="/post/:topic/:id" element={<PostContent />} />
            </Routes>
          </div>
        </div>
      </>
    </Router>
  );
}

export default App;
