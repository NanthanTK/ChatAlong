import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';

const AddPostButton = ({ topic }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    heading: '',
    message: '',
  });
  const navigate = useNavigate();
  const [addPost] = useMutation(ADD_POST);

  const handleAddPostClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        formData.username.trim() === '' ||
        formData.heading.trim() === '' ||
        formData.message.trim() === ''
      ) {
        alert('Please fill all the fields.');
        return;
      }
      await addPost({
        variables: {
          heading: formData.heading,
          message: formData.message,
          topic,
        },
      });
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="heading">Post Heading:</label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Description:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit">Add Post</button>
          </div>
        </form>
      ) : (
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => {
              navigate(`/post/${e.target.value}`);
            }}
          />
          <button onClick={handleAddPostClick}>Add a Post</button>
        </div>
      )}
    </>
  );
};

export default AddPostButton;
