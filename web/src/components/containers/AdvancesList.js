import { connect } from 'react-redux';
import { fetchAdvances, deleteAdvance } from '../../redux/actions';

import { PayementsList } from '../presentationals/PayementsList';

const mapStateToProps = state => ({
  payementItems: state.advances.list,
  fetching: state.advances.fetchingAdvances,
  error: state.advances.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPayementItems: (year, month) => dispatch(fetchAdvances(year, month)),
  deletePayementItem: advance => dispatch(deleteAdvance(advance)),
});

export const AdvancesList = connect(mapStateToProps, mapDispatchToProps)(PayementsList);
