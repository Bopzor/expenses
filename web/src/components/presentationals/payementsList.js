import React from 'react';

import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import PayementItem from './payementItem';

class PayementsList extends React.Component {
  componentDidMount() {
    this.props.fetchPayementItems(this.props.dateFilter);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateFilter !== prevProps.dateFilter) {
      this.props.fetchPayementItems(this.props.dateFilter);
    }
  }

  renderPayementItem(payementItem) {
    return (
      <PayementItem
        key={`key-${payementItem.id}`}
        payementItem={payementItem}
        payementType={this.props.payementType}
        removePayementItem={id => this.props.deletePayementItem(id)}
        date={this.props.date}
      />
    );
  }

  render() {
    const { error, fetching, payementItems, payementType } = this.props;
    let inputPath = payementType === 'expense' ? '/' : `/${payementType}`;

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

PayementsList.propTypes = {
  dateFilter: PropTypes.instanceOf(Date),
  deletePayementItem: PropTypes.func.isRequired,
  fetchPayementItems: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  payementItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      buyer: PropTypes.oneOf(['Nils', 'Vio']),
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  payementType: PropTypes.oneOf(['expense', 'advance']),
};


export default PayementsList;
