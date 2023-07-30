

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PostContent = () => {
  const { topic, id } = useParams();

  // To be replaced with query to generate this info
  const postContent = [
    { id: 1, content: 'Content for Heading 1', reaction: null },
    { id: 2, content: 'Content for Heading 2', reaction: null },
    { id: 3, content: 'Content for Heading 3', reaction: null },
  ];

  const selectedContent = postContent.find((item) => item.id.toString() === id);

  // Rection Update form initial state to false ie hidden
  const [showReactionForm, setShowReactionForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  //Initial Reaction form state
  const [userName, setUserName] = useState('');
  const [reaction, setReaction] = useState('');

  // Initial Update Post form state
  const [updatedContent, setUpdatedContent] = useState(selectedContent?.content);

  const handleReactionClick = () => {
    setShowReactionForm(true);
    setShowUpdateForm(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowReactionForm(false);
  };

  const handleReactionFormSubmit = (event) => {
    event.preventDefault();
    // Handle reaction form submission here
    //add mutation to update reaction data
    selectedContent.reaction = { userName, reaction };
    setShowReactionForm(false);
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    // Handle update form submission here
    //add mutation to update post data
    selectedContent.content = updatedContent;
    setShowUpdateForm(false);
  };

  return (
    <>
      <h3>Post Content for {topic}</h3>
      <p>{selectedContent?.content}</p>
      {!showReactionForm && !showUpdateForm && (
        <>
          <button onClick={handleReactionClick}>Reaction</button>
          <button onClick={handleUpdateClick}>Update Post</button>
        </>
      )}
      {showReactionForm && !showUpdateForm && (
        <form onSubmit={handleReactionFormSubmit}>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reaction">Reaction:</label>
            <input
              type="text"
              id="reaction"
              name="reaction"
              value={reaction}
              onChange={(e) => setReaction(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Submit Reaction</button>
          </div>
        </form>
      )}
      {!showReactionForm && showUpdateForm && (
        <form onSubmit={handleUpdateFormSubmit}>
          <div>
            <label htmlFor="updatedContent">Updated Content:</label>
            <textarea
              id="updatedContent"
              name="updatedContent"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Update Post</button>
          </div>
        </form>
      )}
    </>
  );
};

export default PostContent;
