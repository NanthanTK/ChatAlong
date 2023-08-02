import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST_BY_ID } from '../utils/queries';
import { UPDATE_POST, ADD_RESPONSE } from '../utils/mutations';
import { Card, Button, Comment, Form, Header, Input } from 'semantic-ui-react';
import '../Style/PostContent.css';

const PostContent = () => {
  const { id } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_POST_BY_ID, {
    variables: { postId: id },
  });

  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  //const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  const postContent = data?.post;
  console.log ("postContent",postContent);



  const [addResponse]= useMutation(ADD_RESPONSE);
  const [updatePost] = useMutation(UPDATE_POST);
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleResponseClick = () => {
    setShowResponseForm(true);
    setShowUpdateForm(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowResponseForm(false);
  };


  const responseMessages = postContent.responses.map(response => response.message);
console.log(responseMessages);

  const handleResponseFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if ( message.trim() === '') {
        alert('Please fill all the fields.');
        return;
      }
        console.log("message", message)
      await addResponse({
        variables: {
          postId: id,
          message: `${message}`,
        },
      });
refetch()
      setShowResponseForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (updatedContent.trim() === '') {
        alert('Please enter updated content.');
        return;
      }
      console.log("postID",id)
      console.log("updatedContent",updatedContent)

      await updatePost({
        variables: {
          postId: id,
          message: updatedContent,
        },
      });

      setShowUpdateForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

 

  return (
    <>
      <div className="PostContainer">
        <h1 className="PostTitle">{postContent?.heading}</h1>
        <h2>{postContent?.message}</h2>
        <div>
          {responseMessages.length>0 ?( 
            responseMessages.map((response)=> (
            <h3>{response} </h3>
          ))):<h3>No replies yet</h3>}
        </div>

        {/* Conditionally render the "Update Post" button */}
        {!showUpdateForm && (
          <button onClick={handleUpdateClick}>Update Post</button>
        )}

        {/* Conditionally render the update form */}
        {!showResponseForm && showUpdateForm && (
          <Card>
          <form onSubmit={handleUpdateFormSubmit}>
            <div>
            <Card.Content>
              <Card.Header>Updated Content:</Card.Header>
            </Card.Content>
            <Card.Content>
              <label htmlFor="updatedContent"></label>
              <textarea
                id="updatedContent"
                name="updatedContent"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                required
              />
              </Card.Content>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          </Card>
        )}
      </div>

      <Comment.Group minimal>
        <Header as="h3" dividing>
          Comments
        </Header>

        {/* Render comments here */}

        <div className="CommentContainer">
          <Form onSubmit={handleResponseFormSubmit}>
            <Form.Field>
              <Input
                placeholder="Comment"
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Field>

            <Button content="Add Reply" labelPosition="left" icon="edit" primary />
          </Form>
        </div>
      </Comment.Group>
    </>
  );
};

export default PostContent;
