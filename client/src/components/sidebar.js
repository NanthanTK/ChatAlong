import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react';
import '../Style/Sidebar.css';

const MySidebar = ({ visible }) => {
  return (
    <Grid columns={1}>
      <Grid.Column>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => {}} // Empty onHide, as we are handling visibility from the Header component
          vertical
          visible={visible}
          width='thin'
          dimmed
          style={{ background: 'white' }} // Set background color to white
        >
          <Segment vertical>
            <Link to='/'>
              <Menu.Item as='a'>
                <Icon color='black' name='home' />
                <h3 className="SidebarHeader">Home</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Language'>
              <Menu.Item as='a'>
                <Icon color='black' name='language' />
                <h3 className="SidebarHeader">Language Exchange</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Sports'>
              <Menu.Item as='a'>
                <Icon color='black' name='soccer' />
                <h3 className="SidebarHeader">Sports</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Travel'>
              <Menu.Item as='a'>
                <Icon color='black' name='travel' />
                <h3 className="SidebarHeader">Travel</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Finace '>
              <Menu.Item as='a'>
                <Icon color='black' name='money' />
                <h3 className="SidebarHeader">Finace </h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Medical'>
              <Menu.Item as='a'>
                <Icon color='black' name='medkit' />
                <h3 className="SidebarHeader">Medical</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Games'>
              <Menu.Item as='a'>
                <Icon color='black' name='gamepad' />
                <h3 className="SidebarHeader">Games</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Chat'>
              <Menu.Item as='a'>
                <Icon color='black' name='users' />
                <h3 className="SidebarHeader">Chat</h3>
              </Menu.Item>
            </Link>
          </Segment>
        </Sidebar>
      </Grid.Column>
    </Grid>
  );
};

export default MySidebar;
