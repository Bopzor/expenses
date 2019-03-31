import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

import './payementItem.css';

export const PayementItem = ({ payementItem, payementType, removePayementItem }) => {
  return (
    <tr className={payementItem.buyer.toLowerCase()}>
      <td>
        <Link to={`/${payementType}/${payementItem.id}`} className="link-in-list">
            {moment(payementItem.date).format('DD')}
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
      <td><Button close onClick={() => removePayementItem(payementItem)} /></td>
    </tr>
  );
}
