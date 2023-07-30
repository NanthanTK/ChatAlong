
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import AddPostButton from './AddPostButton';

const Post = ({ posts = [], setPosts }) => {
  const { topic } = useParams();

  const postHeadings = posts.filter((post) => post.topic === topic);

  return (
    <>
      <h1>Post Component - {topic}</h1>
      {postHeadings.length > 0 ? (
        postHeadings.map((post) => (
          <div key={post.id}>
            <h3>
              <Link to={`/post/${topic}/${post.id}`}>{post.title}</Link>
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