import React, { Component } from 'react';

import { Table } from 'reactstrap';

import { calTotal } from '../../utilities';

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
    let totalCommon = 0;

    if (total.nils)
      totalCommon = total.nils.expenses + total.vio.expenses;

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

    if (!total.nils)
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
            <td>{total.nils.expenses}</td>
            <td>{total.nils.advances}</td>
            <td>
              {calTotal(
                totalCommon,
                total.nils.expenses,
                total.nils.advances,
                total.vio.advances
              )}
            </td>
          </tr>

          <tr className="vio">
            <td>{total.vio.expenses}</td>
            <td>{total.vio.advances}</td>
            <td>
              {calTotal(
                totalCommon,
                total.vio.expenses,
                total.vio.advances,
                total.nils.advances
              )}
            </td>
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

export default TotalComponent;
