import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import AddPostButton from './AddPostButton';
import { Segment } from 'semantic-ui-react';
import '../Style/Post.css';

const Post = ({ posts = [], setPosts }) => {
  const { topic } = useParams();

  const postHeadings = posts.filter((post) => post.topic === topic);

  return (
    <div className="PostContainer">
      <h1>{topic}</h1>
      {postHeadings.length > 0 ? (
        postHeadings.map((post) => (
          <div key={post.id}>
            <Segment className='PostSegment'>
              <Link to={`/post/${topic}/${post.id}`}>
                {post.title}
              </Link>
            </Segment>
          </div>
        ))
      ) : (
        <p>No posts yet. Please add a post.</p>
      )}
      <AddPostButton setPosts={setPosts} topic={topic} />
      <Outlet />
    </div>
  );
};

export default Post;
