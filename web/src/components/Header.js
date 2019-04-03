import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { MonthAndYearPicker } from './MonthAndYearPicker';

import './Header.css';

export class Header extends Component {
  state = {
    modal: false,
  };

  renderPayementTypeNav(payementTypeNav) {
    return (
      <NavLink
        to={`${payementTypeNav.path}`}
        activeClassName="active"
        className="payement-type"
        key={payementTypeNav.pathname}
      >
        { payementTypeNav.pathname }
      </NavLink>
    );
  }

  formatMonthNavLink(year, month) {
    return (
      <NavLink
        className="date"
        to={`/list/expenses/${year}/${month}`}
      >
        { `${month}-${year}` }
      </NavLink>
    );
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { year, month, navPaths } = this.props;

    return (
      <nav className="header">

        {
          navPaths ? navPaths.map(elem => this.renderPayementTypeNav(elem)) : null
        }

        <span onClick={() => this.toggleModal()}>

          {this.formatMonthNavLink(year, month)}
          <i className="far fa-calendar-alt" />

          <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>

            <ModalHeader toggle={() => this.toggleModal()}>Change date</ModalHeader>

            <ModalBody>

              <MonthAndYearPicker
                year={year}
                month={month}
                closeModal={() => this.toggleModal()}
              />

            </ModalBody>

          </Modal>

        </span>

      </nav>
    );
  }
}
