import React from 'react';
import { NavLink } from 'react-router-dom';

import { PayementItem } from './PayementItem';

export class PayementsList extends React.Component {
  componentDidMount() {
    this.props.fetchPayementItems(this.props.year, this.props.month);
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.month !== prevProps.month) {
      this.props.fetchPayementItems(this.props.year, this.props.month);
    }
  }

  renderPayementItem(payementItem) {
    return (
      <PayementItem
        key={`key-${payementItem.id}`}
        payementItem={payementItem}
        payementType={this.props.payementType}
        removePayementItem={payementItem => this.props.deletePayementItem(payementItem)}
        date={this.props.date}
      />
    );
  }

  render() {
    const { error, fetching, payementItems, payementType, year, month } = this.props;
    const inputPath =  `/add/${year}/${month}/${payementType}`;

    if (error) {
      return (
        <tbody>
          <tr>
            <td colSpan="4">Error! {error.message}</td>
          </tr>
        </tbody>
      );
    }

    if (fetching) {
      return (
        <tbody>
          <tr>
            <td colSpan="4"><img src="/loader.gif" alt="Loading..." /></td>
          </tr>
        </tbody>
      );
    }

    if (!payementItems)
      return null;

    return (
      <tbody>
        <tr>
          <td colSpan="4">
            <NavLink exact to={inputPath}>Add new {payementType}</NavLink>
          </td>
        </tr>
        {payementItems.map(p => this.renderPayementItem(p))}
      </tbody>
    );
  }
}
