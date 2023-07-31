

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Style/PostContent.css';
import { Segment, Button, Comment, Form, Header,Input } from 'semantic-ui-react'

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
   
    <div className='PostContainer'>
      <h1 className='PostTitle'>Title</h1>
      <p className="PostUsername">By:Username</p>
      <h2>{selectedContent?.content}</h2>
      </div>

  <Comment.Group minimal>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <span>Today at 5:42PM</span>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group>
        <Comment>
          <Comment.Avatar as='a' src='/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <span>Just now</span>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar as='a' src='/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <span>5 days ago</span>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <a>Reply</a>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
<div className='CommentContainer'>
    <Input placeholder='Comment'
                  type="text"
                  id="reaction"
                  name="reaction"
                  value={reaction}
                  onChange={(e) => setReaction(e.target.value)}
                  required/>
    <Input placeholder='Username'
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </div>
  </Comment.Group>


      {/* {!showReactionForm && !showUpdateForm && (
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
      )}*/}
    </> 
  );
};

export default PostContent;
