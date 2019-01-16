import React, { Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Collapse
} from 'reactstrap';

import { connect } from 'react-redux';

class Header extends Component {
  state = {
    isOpen: false,
  };

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}

  formatNavLink(date) {
    return (
      <NavLink href={`/${date.getFullYear()}-${date.getMonth()}`}>
        {`${date.getMonth() + 1}/${date.getFullYear()}`}
      </NavLink>
    )
  }

  formatDate() {
    const { date } = this.props;
    let month = date.getMonth() + 1;

    if (month < 10)
      month = `0${month}`;

    return `${month}/${this.props.date.getFullYear()}`;
  }

  render() {
    const currentDate = new Date();
    const date = this.formatDate();

    return (
      <Navbar color="light" light expand="sm">

        <NavbarBrand href="/">Expenses - {date}</NavbarBrand>
        <NavbarToggler onClick={() => this.toggle()} />

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav>

            <NavItem>
              <NavLink href="/">Add</NavLink>
            </NavItem>

            <NavItem>
              {this.formatNavLink(currentDate)}
            </NavItem>

            <NavItem>
                {this.formatNavLink(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
                )}
            </NavItem>

            <NavItem>
                {this.formatNavLink(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 2)
                )}
            </NavItem>

            <NavItem>
                {this.formatNavLink(
                  new Date(currentDate.getYear(), currentDate.getMonth() - 3)
                )}
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
    );
  }
};

const mapStateToProps = state => ({
  date: state.dateFilter,
});

export default connect(mapStateToProps)(Header);
