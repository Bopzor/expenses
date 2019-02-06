import { connect } from 'react-redux';
import { fetchAdvances, deleteAdvance } from '../../redux/actions';

import PayementsList from '../presentationals/payementsList';

const mapStateToProps = state => ({
  payementItems: state.advances.list,
  fetching: state.advances.fetchingAdvances,
  error: state.advances.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPayementItems: (dateFilter = undefined) => dispatch(fetchAdvances(dateFilter)),
  deletePayementItem: id => dispatch(deleteAdvance(id)),
});

const AdvancesList = connect(mapStateToProps, mapDispatchToProps)(PayementsList);

export default AdvancesList;