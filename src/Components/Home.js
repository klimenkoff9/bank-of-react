import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import AccountBalance from './AccountBalance';

class Home extends Component {
  state = {
    isOpen: false
  }

  toggle = () =>{
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Bank Of React</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
              <NavLink href="/userProfile">User Profile</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="/userDebits">Debits</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="/userCredits">Credits</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;