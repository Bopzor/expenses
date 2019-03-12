import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import './payementItem.css';

const payementItem = ({ payementItem, payementType, removePayementItem }) => {
  return (
    <tr className={payementItem.buyer.toLowerCase()}>
      <td>
        <Link to={`/${payementType}/${payementItem.id}`} className="link-in-list">
            {new Date(payementItem.date).getDate()}
         </Link>
      </td>
      <td>
        <Link to={`/${payementType}/${payementItem.id}`} className="link-in-list">
          {payementItem.description}
        </Link>
      </td>
      <td>
        <Link to={`/${payementType}/${payementItem.id}`} className="link-in-list">
          {payementItem.cost}€
        </Link>
      </td>
      <td><Button close onClick={() => removePayementItem(payementItem.id)} /></td>
    </tr>
  );
}

payementItem.propTypes = {
  /** The expense or advance to display */
  payementItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    buyer: PropTypes.oneOf(['Nils', 'Vio']),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  payementType: PropTypes.oneOf(['expense', 'advance']).isRequired,
  /** To delete a payement item from the database */
  removePayementItem: PropTypes.func.isRequired,
};

export default payementItem;