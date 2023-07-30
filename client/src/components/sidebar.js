
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const topics = ['Holidays', 'Politics','Sports', 'Finance'];

const Sidebar = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <>
      {topics.map((topic) => (
        <React.Fragment key={topic}>
          <h3 onClick={() => handleTopicClick(topic)} style={{ cursor: 'pointer' }}>
            <Link to={`/post/${topic}`}>{topic}</Link>
          </h3>
         
        </React.Fragment>
      ))}
    </>
  );
};

export default Sidebar;

