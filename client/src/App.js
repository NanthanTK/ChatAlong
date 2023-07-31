
import React, {useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import PostContent from './components/postcontent';
import Post from './components/post'
import Landingpage from './components/landingpage'
import AltHeader from './components/AltHeader'


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
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
  </ApolloProvider>
  );
}

export default App;
