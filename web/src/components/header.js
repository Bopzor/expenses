import React, { Component} from 'react';
import { Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { formatDate } from '../utilities';

import './header.css'

class Header extends Component {

  state = {
    popoverOpen: false,
    date: '',
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  formatNavLink(date) {
    return (
      <NavLink to="/month">
        {formatDate(date)}
      </NavLink>
    )
  }

  dateChange(e) {
    this.setState({ date: e.target.value });
  }

  render() {
    if (!this.props.navPaths) {
      return (
        <nav className="header">

          <span onClick={() => this.toggle()}>
            {this.formatNavLink(this.props.date)}
            <i className="far fa-calendar-alt"></i>

            <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
              <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
              <ModalBody>
                <Input
                  type="date"
                  value={this.state.date}
                  placeholder={this.state.date}
                  onChange={e => this.dateChange(e)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {
                  this.props.changeDate(this.state.date)
                  this.toggle()
                }}>Change</Button>{' '}
                <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </span>

        </nav>
      )
    }

    return (
        <nav className="header">

          <NavLink exact to={`${this.props.navPaths[0].path}`} activeClassName="active">
            {this.props.navPaths[0].pathname}
          </NavLink>

          <NavLink to={`${this.props.navPaths[1].path}`}>
            {this.props.navPaths[1].pathname}
          </NavLink>

          <span onClick={() => this.toggle()}>
            {this.formatNavLink(this.props.date)}
            <i className="far fa-calendar-alt"></i>

            <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
              <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
              <ModalBody>
                <Input
                  type="date"
                  value={this.state.date}
                  placeholder={this.state.date}
                  onChange={e => this.dateChange(e)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {
                  this.props.changeDate(this.state.date)
                  this.toggle()
                }}>Change</Button>{' '}
                <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </span>

        </nav>
    );
  }
};

Header.propTypes = {
  date: PropTypes.instanceOf(Date),
  changeDate: PropTypes.func.isRequired,
  navPaths: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  })),
};

export default Header;
