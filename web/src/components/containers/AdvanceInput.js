import { connect } from 'react-redux';
import { createAdvance, editAdvance, validateAdvance, validateField } from '../../redux/actions';

import { PayementItemInput } from '../presentationals/PayementItemInput';

const mapsStateToProps = state => ({
  isSubmitting: state.advances.addingAdvance,
  errors: state.advances.errors,
});

const mapDispatchToProps = dispatch => ({
  createPayementItem: body => dispatch(createAdvance(body)),
  editPayementItem: body => dispatch(editAdvance(body)),
  validatePayementItem: body => dispatch(validateAdvance(body)),
  validateField: body => dispatch(validateField(body)),
});

export const AdvanceInput = connect(mapsStateToProps, mapDispatchToProps)(PayementItemInput);
