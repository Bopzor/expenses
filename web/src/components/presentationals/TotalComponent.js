import React, { Component } from 'react';

import './TotalComponent.css';

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
    const { error, fetching, total, display = true } = this.props;
    const { nils, vio, totalCommon } = total;

    if (error) {
      return (
        <table>
          <tbody>
            <tr>
              <td colSpan="4">Error! {error.message}</td>
            </tr>
          </tbody>
        </table>
      );
    }

    if (fetching) {
      return (
        <table>
          <tbody>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tbody>
        </table>
      );
    }

    if (totalCommon === undefined)
      return null;

    return (
      <div className={display === true ? 'total-table' : 'total-table hidden' }>
        <table>
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
        </table>
      </div>
    );
  }
}
