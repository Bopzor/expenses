import { connect } from 'react-redux';
import { fetchTotal } from '../../redux/actions';

import TotalComponent from '../presentationals/totalComponent';

const mapStateToProps = state => ({
  total: state.total.total,
  fetching: state.total.fetchingTotal,
  error: state.total.error,
});

const mapDispatchToProps = dispatch => ({
  fetchTotal: (dateFilter = undefined) => dispatch(fetchTotal(dateFilter)),
});

const Total = connect(mapStateToProps, mapDispatchToProps)(TotalComponent);

export default Total;
