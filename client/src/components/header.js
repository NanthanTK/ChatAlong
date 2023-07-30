// import React, { Component } from 'react';
// import { Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import Logo from '../Images/Chat_Along_logo.jpg';
// import '../Style/header.css';

// export default class Header extends Component {
//   render() {
//     return (
//       <Menu pointing secondary>
//         <Menu.Item>
//           <Link to="/">
//             <img class="Img_logo" alt="logo" src={Logo} />
//           </Link>
//         </Menu.Item>

//         <Menu.Menu position='right'>
//           <Menu.Item name='logout' />
//         </Menu.Menu>
//       </Menu>
//     );
//   }
// }

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}