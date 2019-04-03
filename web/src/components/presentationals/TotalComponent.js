import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class TotalComponent extends Component {
  componentDidMount() {
    this.props.fetchTotal(this.props.year, this.props.month);
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.month !== prevProps.month) {
      this.props.fetchTotal(this.props.year, this.props.month);
    }
  }

  render() {
    const { error, fetching, total } = this.props;
    const { nils, vio, totalCommon } = total;

    if (error) {
      return (
        <Table size="sm" responsive className="fixed-bottom">
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
        <Table size="sm" responsive className="fixed-bottom">
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
      <Table size="sm" responsive className="fixed-bottom">
        <thead className="bg-white">
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
