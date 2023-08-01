

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery, useMutation} from '@apollo/client';
// import { QUERY_POST_BY_ID } from '../utils/queries';
// import {UPDATE_POST, DELETE_POST, ADD_RESPONSE} from '../utils/mutations';

// const PostContent = () => {
//   const { id } = useParams();  
//   const { loading, data } = useQuery(QUERY_POST_BY_ID, {      
//     variables: { postId: id },
//   });     

//   const [showResponseForm, setShowResponseForm] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [message, setMessage] = useState('');
//   const [updatedContent, setUpdatedContent] = useState('');

//   const post = data?.post;

//   const addResponse = useMutation(ADD_RESPONSE);
//   const updatePost = useMutation(UPDATE_POST);


//   const handleResponseClick = () => {
//     setShowResponseForm(true);
//     setShowUpdateForm(false);
//   };

//   const handleUpdateClick = () => {
//     setShowUpdateForm(true);
//     setShowResponseForm(false);
//   };

//   const handleResponseFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (userName.trim() === '' || message.trim() === '') {
//         alert('Please fill all the fields.');
//         return;
//       }

//       await addResponse({
//         variables: {
//           postId: id,
//           message: `${userName}: ${message}`,
//         },
//       });

//       setShowResponseForm(false);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleUpdateFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (updatedContent.trim() === '') {
//         alert('Please enter updated content.');
//         return;
//       }

//       await updatePost({
//         variables: {
//           postId: id,
//           message: updatedContent,
//         },
//       });

//       setShowUpdateForm(false);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <h3>Post Content for {post?.heading}</h3>
//       <p>{post?.message}</p>
//       {!showResponseForm && !showUpdateForm && (
//         <>
//           <button onClick={handleResponseClick}>Response</button>
//           <button onClick={handleUpdateClick}>Update Post</button>
//         </>
//       )}
//       {showResponseForm && !showUpdateForm && (
//         <form onSubmit={handleResponseFormSubmit}>
//           <div>
//             <label htmlFor="userName">User Name:</label>
//             <input
//               type="text"
//               id="userName"
//               name="userName"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="message">Message:</label>
//             <input
//               type="text"
//               id="message"
//               name="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <button type="submit">Submit Reaction</button>
//           </div>
//         </form>
//       )}
//       {!showResponseForm && showUpdateForm && (
//         <form onSubmit={handleUpdateFormSubmit}>
//           <div>
//             <label htmlFor="updatedContent">Updated Content:</label>
//             <textarea
//               id="updatedContent"
//               name="updatedContent"
//               value={message}
//               onChange={(e) => setUpdatedContent(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <button type="submit">Update Post</button>
//           </div>
//         </form>
//       )}
//     </>
//   );
// };

// export default PostContent;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST_BY_ID } from '../utils/queries';
import { UPDATE_POST, ADD_RESPONSE } from '../utils/mutations';
import { Card, Button, Comment, Form, Header, Input } from 'semantic-ui-react';
import '../Style/PostContent.css';

const PostContent = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_POST_BY_ID, {
    variables: { postId: id },
  });

  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  //const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  const postContent = data?.post;
  console.log ("postContent",postContent);

  const addResponse = useMutation(ADD_RESPONSE);
  const updatePost = useMutation(UPDATE_POST);

  const handleResponseClick = () => {
    setShowResponseForm(true);
    setShowUpdateForm(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowResponseForm(false);
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="PostContainer">
        <h1 className="PostTitle">{postContent?.heading}</h1>
        <p className="PostUsername">By: {postContent?.username}</p>
        <h2>{postContent?.message}</h2>

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
            {/* <Form.Field>
              <Input
                placeholder="Username"
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Field> */}
            <Button content="Add Reply" labelPosition="left" icon="edit" primary />
          </Form>
        </div>
      </Comment.Group>
    </>
  );
};

export default PostContent;
