import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Table } from 'reactstrap';

class TotalComponent extends Component {
  componentDidMount() {
    this.props.fetchTotal(this.props.dateFilter);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateFilter !== prevProps.dateFilter) {
      this.props.fetchTotal(this.props.dateFilter);
    }
  }

  render() {
    const { error, fetching, total } = this.props;
    const { nils, vio, totalCommon } = total;

    if (error) {
      return (
        <Table size="sm" responsive>
          <tbody>
            <tr>
              <td colSpan="4">Error! {error.message}</td>
            </tr>
          </tbody>
        </Table>
      );
    }

    if (fetching) {
      return (
        <Table size="sm" responsive>
          <tbody>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tbody>
        </Table>
      );
    }

    if (totalCommon === undefined)
      return null;

    return (
      <Table size="sm" responsive>
        <thead>
          <tr>
            <th>Expenses</th>
            <th>Advances</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          <tr className="nils">
            <td>{nils.expenses}</td>
            <td>{nils.advances}</td>
            <td>{nils.total}</td>
          </tr>

          <tr className="vio">
            <td>{vio.expenses}</td>
            <td>{vio.advances}</td>
            <td>{vio.total}</td>
          </tr>

          <tr>
            <td>{totalCommon}</td>
            <th scope="col" colSpan="2">Total</th>
          </tr>

        </tbody>
      </Table>
    );
  }
}

TotalComponent.propTypes = {
  className: PropTypes.string,
  dateFilter: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.oneOf([null])]),
  fetchTotal: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  total: PropTypes.shape({
    totalCommon: PropTypes.number,
    nils: PropTypes.shape({
      advances: PropTypes.number.isRequired,
      expenses: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }),
    vio: PropTypes.shape({
      advances: PropTypes.number.isRequired,
      expenses: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    }),
  }),
};

export default TotalComponent;
