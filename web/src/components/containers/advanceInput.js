import { connect } from 'react-redux';
import { createAdvance, editAdvance } from '../../redux/actions';

import PayementItemInput from '../presentationals/payementItemInput';

const mapsStateToProps = state => ({
  isSubmitting: state.advances.addingAdvance,
  errors: state.advances.errors,
});

const mapDispatchToProps = dispatch => ({
  createPayementItem: body => dispatch(createAdvance(body)),
  editPayementItem: body => dispatch(editAdvance(body)),
});

const AdvanceInput = connect(mapsStateToProps, mapDispatchToProps)(PayementItemInput);

export default AdvanceInput;