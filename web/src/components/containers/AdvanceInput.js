import { connect } from 'react-redux';
import { createAdvance, editAdvance } from '../../redux/actions';

import { PayementItemInput } from '../presentationals/PayementItemInput';

const mapsStateToProps = state => ({
  isSubmitting: state.advances.addingAdvance,
  errors: state.advances.errors,
});

const mapDispatchToProps = dispatch => ({
  createPayementItem: body => dispatch(createAdvance(body)),
  editPayementItem: body => dispatch(editAdvance(body)),
});

export const AdvanceInput = connect(mapsStateToProps, mapDispatchToProps)(PayementItemInput);
