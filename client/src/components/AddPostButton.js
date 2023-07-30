import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <label htmlFor="title">Post Heading:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button type="submit">Add Post</button>
      </div>
    </form>
  );
};

export default AddPostButton;