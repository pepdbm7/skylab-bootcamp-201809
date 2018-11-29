import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, Fa } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick = () => this.setState({ collapse: !this.state.collapse });
  

  goToHome = () => this.props.history.push('/home')
  
  goToProfile = () => this.props.history.push('/profile')

  goToContact = () => this.props.history.push('/contact')

  goToCart = () => this.props.history.push('/cart')

  goToOrders = () => this.props.history.push('/vieworders')

  handleLogoutClick = () => {
    logic.logout()

    this.props.history.push('/')
}

  render() {
      return(
        <div>
          <Router>
          <Navbar className="navbar__background" dark expand="md" scrolling fixed="top">
            <NavbarBrand href="/" to ="/">
                <strong>Planbe</strong>
            </NavbarBrand>
            <NavbarToggler onClick={ this.onClick } />
            <Collapse isOpen = { this.state.collapse } navbar>
              <NavbarNav left>
                <NavItem>
                    <a className="nav-link waves-effect waves-light" onClick ={this.goToHome}><Fa icon="home" aria-hidden="true" />Home</a>
                </NavItem>
                <NavItem>
                  <a className="nav-link waves-effect waves-light" onClick ={this.goToProfile}><Fa icon="user" />Profile</a>
                </NavItem>
                <NavItem>
                    <a className="nav-link waves-effect waves-light" onClick ={this.goToContact}><i className="fas fa-file-signature" /> Contact</a>
                </NavItem>
              </NavbarNav>

              <NavbarNav right>
                <NavItem>
                  <a className="nav-link waves-effect waves-light" onClick ={this.goToCart}><Fa icon="shopping-cart" aria-hidden="true" />Shopping Cart</a>
                </NavItem>
                <NavItem>
                    <a className="nav-link waves-effect waves-light" onClick ={this.goToOrders}><i className="fas fa-history" /> Last orders</a>
                </NavItem>
                <NavItem>
                  <a className="nav-link waves-effect waves-light" onClick ={this.handleLogoutClick}><Fa icon="sign-out-alt" />Logout</a>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
          </Router>
        </div>
      );
  }
}
 
export default withRouter (Header)