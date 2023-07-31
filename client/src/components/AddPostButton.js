import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/AddPostButton.css';
import { Card, Form, Icon } from 'semantic-ui-react'

const AddPostButton = ({ setPosts, topic }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddPostClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (
      formData.username.trim() === '' ||
      formData.title.trim() === '' ||
      formData.description.trim() === ''
    ) {
      alert('Please fill all the fields.'); // Add validation
      return;
    }

    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        topic,
        username: formData.username,
        title: formData.title,
        description: formData.description,
        reaction: null,
      },
    ]);
    navigate(`/post/${topic}`);
    setShowForm(false)
  };

  return (
    <>
      {showForm ? (
        <AddPostForm topic={topic} onSubmit={handleFormSubmit} />
      ) : (
            < Icon onClick={handleAddPostClick} name='plus circle' size='big' color='orange' className='custom-icon' ></Icon>
       
      )}
    </>
  );
};

const AddPostForm = ({ topic, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="AddPostContainer">
      <Card className='AddPostCard custom-style'>
    <Card.Content >
      <Card.Header>Post to {topic}.</Card.Header>
    </Card.Content>   

    <Card.Content>
          
    <Form onSubmit={handleFormSubmit}>
    <Form.Input  fluid label='Title:' placeholder='Title'
    className="input-field" 
              type="text"
              id="Title"
              name="Title"
              value={formData.username}
              onChange={handleInputChange}
              required/>
        <Form.Input fluid label='Username:' placeholder='Username' 
        className="input-field" 
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required/>   
          <Form.TextArea fluid label='Description:' placeholder='Description' 
          className="input-field" 
          id="description"

          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required/>   

    <Form.Button color='orange'>Submit</Form.Button>
    </Form>
    </Card.Content>
  </Card>
  </div>
  );
};

export default AddPostButton;





