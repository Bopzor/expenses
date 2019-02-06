import React from 'react';
import { Link } from 'react-router-dom';

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

export default payementItem;