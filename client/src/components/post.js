import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AddPostButton from './AddPostButton';
import { QUERY_POST_BY_TOPIC } from '../utils/queries';

const Post = ({ setPosts }) => {
  const { topic } = useParams();

  // Fetch data using useQuery hook
  const { loading, error, data } = useQuery(QUERY_POST_BY_TOPIC, {
    variables: { topic },
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the posts from the returned data
  const posts = data.postsByTopic;

  return (
    <>
      <h1>Post Component - {topic}</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>
              <Link to={`/post/${topic}/${post._id}`}>{post.heading}</Link>
            </h3>
          </div>
        ))
      ) : (
        <p>No posts yet. Please add a post.</p>
      )}
      <AddPostButton setPosts={setPosts} topic={topic} />
      <Outlet />
    </>
  );
};

export default Post;
