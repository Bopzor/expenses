import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  formatMonthLink(year, month) {
    return (
      <Link
        className="date"
        to={`/list/expenses/${year}/${month}`}
      >
        { `${month}-${year}` }
      </Link>
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

        <span>

          {this.formatMonthLink(year, month)}
          <FontAwesomeIcon icon="calendar-alt" onClick={() => this.toggleModal()} />

          <ReactModal
            isOpen={this.state.modal}
            onRequestClose={() => this.toggleModal()}
            style={{
              overlay: {
                zIndex: 1031 // bootstrap put z-index = 1030 on fixed-bottom class used in TotalComponent
              },
              content: {
                position: "relative",
                bottom: "initial",
                left: "initial",
                right: "initial",
                margin: '0 10px'
              }
            }}
          >

            <h3 className="modal-header">Change month</h3>

            <div>

              <MonthAndYearPicker
                year={year}
                month={month}
                closeModal={() => this.toggleModal()}
              />

            </div>

          </ReactModal>

        </span>

      </nav>
    );
  }
}
