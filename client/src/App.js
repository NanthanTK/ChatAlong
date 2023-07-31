
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import PostContent from './components/postcontent';
import Post from './components/post'
import Landingpage from './components/landingpage'
import AuthForm from './components/AuthForm'
import './Style/index.css'

function App() {
  const [posts, setPosts] = useState([]);
  return (

    
    <Router>
      <>
      <div className="background"></div>
        <Header />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <Routes>
              <Route excat path="/" element={<Landingpage /> } />
              <Route path="/login&signup" element={<AuthForm /> } />
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
