import { connect } from 'react-redux';
import { fetchTotal } from '../../redux/actions';

import { TotalComponent } from '../presentationals/TotalComponent';

const mapStateToProps = state => ({
  total: state.total.total,
  fetching: state.total.fetchingTotal,
  error: state.total.error,
});

const mapDispatchToProps = dispatch => ({
  fetchTotal: (year, month) => dispatch(fetchTotal(year, month)),
});

export const Total = connect(mapStateToProps, mapDispatchToProps)(TotalComponent);
