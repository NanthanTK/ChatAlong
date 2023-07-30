
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import PostContent from './components/postcontent';
import Post from './components/post'
import Landingpage from './components/landingpage'
import AltHeader from './components/AltHeader'

function App() {
  const [posts, setPosts] = useState([]);
  //add for login/registration forms
  // const [loggedInUser, setLoggedInUser] = useState(null);

  // const handleRegister = (formData) => {
  //   // Handle registration logic here
  //   // For simplicity, we'll just set the loggedInUser state with the username
  //   setLoggedInUser({ username: formData.username });
  // };

  // const handleLogin = (formData) => {
  //   // Handle login logic here
  //   // For simplicity, we'll just set the loggedInUser state with the email
  //   setLoggedInUser({ email: formData.email });
  // };

  // const handleLogout = () => {
  //   // Handle logout logic here
  //   // For simplicity, we'll just clear the loggedInUser state
  //   setLoggedInUser(null);
  return (
    <Router>
      <>
      <AltHeader />
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
