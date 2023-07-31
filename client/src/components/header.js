import React, { useState } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Chat_Along_logo.jpg';
import MySidebar from './sidebar';
import '../Style/header.css';

export default function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <Menu pointing secondary>
        <div className='menu_bar' onClick={handleSidebarToggle}>
          <Icon name='bars' size='big' />
        </div>
        <Menu.Item>
          <Link to='/'>
            <img className="Img_logo" alt="logo" src={Logo} />
          </Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/login&signup'>
            <Button color='orange'>Login</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <MySidebar  visible={sidebarVisible} />
    </>
  );
}
