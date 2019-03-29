import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import './header.css';
import { MonthAndYearPicker } from './monthAndYearPicker';

class Header extends Component {
  state = {
    modal: false,
    date: '',
  };

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  formatNavLink(date) {
    return <NavLink to="/month">{moment(date, 'MM-YYYY').format('MM-YYYY')}</NavLink>;
  }

  dateChange(month, year) {
    this.setState({date: moment(`${month}-${year}`, 'MM-YYYY')})
  }

  render() {
    if (!this.props.navPaths) {
      return (
        <nav className="header">
          <span onClick={() => this.toggle()}>
            {this.formatNavLink(this.props.date)}
            <i className="far fa-calendar-alt" />

            <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
              <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
              <ModalBody>
                <MonthAndYearPicker
                  date={this.props.date}
                  onChangeDate={(month, year) => this.dateChange(month, year)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.changeDate(this.state.date);
                    this.toggle();
                  }}
                >
                  Change
                </Button>{' '}
                <Button color="secondary" onClick={() => this.toggle()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </span>
        </nav>
      );
    }

    return (
      <nav className="header">
        <NavLink exact to={`${this.props.navPaths[0].path}`} activeClassName="active">
          {this.props.navPaths[0].pathname}
        </NavLink>

        <NavLink to={`${this.props.navPaths[1].path}`}>{this.props.navPaths[1].pathname}</NavLink>

        <span onClick={() => this.toggle()}>
          {this.formatNavLink(this.props.date)}
          <i className="far fa-calendar-alt" />

          <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
            <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
            <ModalBody>
              <MonthAndYearPicker
                date={this.props.date}
                onChangeDate={(month, year) => this.dateChange(month, year)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.props.changeDate(this.state.date);
                  this.toggle();
                }}
              >
                Change
              </Button>{' '}
              <Button color="secondary" onClick={() => this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </span>
      </nav>
    );
  }
}

Header.propTypes = {
  date: PropTypes.string,
  changeDate: PropTypes.func.isRequired,
  navPaths: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    })
  ),
};

export default Header;
