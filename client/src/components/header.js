import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Chat_Along_logo.jpg';
import '../Style/header.css';

export default class Header extends Component {
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item>
          <Link to="/">
            <img class="Img_logo" alt="logo" src={Logo} />
          </Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='logout' />
        </Menu.Menu>
      </Menu>
    );
  }
}
