import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import './header.css';
import { MonthAndYearPicker } from './monthAndYearPicker';

export class Header extends Component {
  state = {
    modal: false,
  };

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  formatNavLink(year, month) {
    return (
      <NavLink
        className="date"
        to={`/list/expenses/${year}/${month}`}
      >
        {`${month}-${year}`}
      </NavLink>
    );
  }

  render() {
    if (!this.props.navPaths) {
      return (
        <nav className="header">
          <span onClick={() => this.toggle()}>
            {this.formatNavLink(this.props.year, this.props.month)}
            <i className="far fa-calendar-alt" />

            <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
              <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
              <ModalBody>
                <MonthAndYearPicker
                  year={this.props.year}
                  month={this.props.month}
                  closeModal={() => this.toggle()}
                />
              </ModalBody>
            </Modal>
          </span>
        </nav>
      );
    }

    return (
      <nav className="header">
        <NavLink
          to={`${this.props.navPaths[0].path}`}
          activeClassName="active"
          className="payement-type"
        >
          {this.props.navPaths[0].pathname}
        </NavLink>

        <NavLink
          to={`${this.props.navPaths[1].path}`}
          className="payement-type"
        >
          {this.props.navPaths[1].pathname}
        </NavLink>

        <span onClick={() => this.toggle()}>
          {this.formatNavLink(this.props.year, this.props.month)}
          <i className="far fa-calendar-alt" />

          <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
            <ModalHeader toggle={() => this.toggle()}>Change date</ModalHeader>
            <ModalBody>
              <MonthAndYearPicker
                year={this.props.year}
                month={this.props.month}
                closeModal={() => this.toggle()}
              />
            </ModalBody>
          </Modal>
        </span>
      </nav>
    );
  }
}
