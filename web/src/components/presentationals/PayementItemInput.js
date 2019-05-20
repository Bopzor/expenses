import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './PayementItemInput.css';

import {
  Col,
  ButtonGroup,
  Button,
  Input,
  Label
} from 'reactstrap';

export class PayementItemInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date ? moment(props.date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      description: '',
      cost: '',
      buyer: '',
      initialized: false,
      redirect: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.payementItem === undefined || prevState.initialized)
      return null;

    return ({
      date: nextProps.payementItem.date,
      description: nextProps.payementItem.description,
      cost: nextProps.payementItem.cost,
      buyer: nextProps.payementItem.buyer,
      id: nextProps.payementItem.id,
      initialized: true,
      redirect: '',
    });
  }

  async submitPayementItem(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.validatePayementItem({ description: this.state.description, cost: this.state.cost });

    if (this.props.errors !== null)
      return;

    let redirect = (this.props.payementType === 'advance'
      ? `/list/advances/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
      : `/list/expenses/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
    );

    if (!this.props.payementItem) {
      await this.props.createPayementItem(this.state);

      if (this.props.errors === null) {
        this.setState({ redirect });
      } else
        return;

    } else {
      await this.props.editPayementItem(this.state);

      if (this.props.errors === null) {
        this.setState({ redirect });
      } else
        return;
    }
  }

  onDateChange(event) {
    this.setState({ date: event.target.value.toString() });
  }

  onDescriptionChange(event) {
    this.props.validateField({ name: 'description', value: event.target.value });
    this.setState({ description: event.target.value });
  }

  onCostChange(event) {
    this.props.validateField({ name: 'cost', value: event.target.value });
    this.setState({ cost: event.target.value });
  }

  buyerChange(buyer) {
    this.setState({ buyer });
  }

  emptyState() {
    if (this.state.description === '' || this.state.buyer === '' || this.state.cost === '')
      return true;

    else
      return false;
  }

  resetPayementInput() {
    this.setState({
      date: moment().format('YYYY-MM-DD'),
      description: '',
      cost: '',
      buyer: '',
      advance: false,
      initialized: false,
      redirect: '',
    });

  }

  onCancelUpdate() {
    let redirect = (this.props.payementType === 'advance'
      ? `/list/advances/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
      : `/list/expenses/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
    );

    this.setState({ redirect })
  }

  renderActionButton() {
    if (!this.state.initialized) {
      return (
        <Button type="button" onClick={() => this.resetPayementInput()}>
          Reset
        </Button>
      )
    }

    return (
      <Button type="button" onClick={() => this.onCancelUpdate()}>
        Cancel
      </Button>
    )
  }

  renderFeedback(field) {
    const { errors } = this.props;

    if (!errors || !errors[field])
      return null;

    if (errors[field] && errors[field].message === undefined )
      return null;

    return (
      <div className="feedback">
        { errors[field].message }
      </div>
    );
  }

  render() {
    const { redirect, date, description, cost, buyer } = this.state;
    const { errors, onInputFocus, onInputBlur, isSubmitting } = this.props;
    const buttonValue = this.props.payementItem ? 'Edit' : 'Add';

    if (redirect !== '') {
      return <Redirect to={redirect} />
    }

    return (
      <div className="form-flex">
        <form onSubmit={e => this.submitPayementItem(e)}>
          <div>
            <Label for="date" xs={2}>Date</Label>
            <Col xs="12">
              <Input
                type="date"
                value={date}
                placeholder={date}
                onChange={e => this.onDateChange(e)}
              />

              { this.renderFeedback('date') }
            </Col>
          </div>

          <div>
            <Col xs="12">
              <Label for="description">Description</Label>
              <Input
                type="text"
                placeholder='description'
                value={description}
                onChange={e => this.onDescriptionChange(e)}
                invalid={errors && errors.description && errors.description.message !== undefined}
                onFocus={() => onInputFocus()}
                onBlur={() => onInputBlur()}
              />

              { this.renderFeedback('description') }
            </Col>
          </div>

          <div>
            <Col xs="12">
            <Label for="cost">Cost</Label>
              <Input
                type="number"
                placeholder='€'
                value={cost}
                onChange={e => this.onCostChange(e)}
                invalid={errors && errors.cost && errors.cost.message !== undefined}
                onFocus={() => onInputFocus()}
                onBlur={() => onInputBlur()}
              />

              { this.renderFeedback('cost') }
            </Col>
          </div>

          <div>
            <Col xs="12">
              <Label for="buyer">Buyer</Label>
              <br/>
              <ButtonGroup>

                <Button
                  type="button"
                  onClick={() => this.buyerChange('Nils')}
                  active={buyer === 'Nils'}
                  outline={buyer !== 'Nils'}
                  className="buyer"
                  color="warning"
                >
                  Nils
                </Button>

                <Button
                  type="button"
                  onClick={() => this.buyerChange('Vio')}
                  active={buyer === 'Vio'}
                  outline={buyer !== 'Vio'}
                  className="buyer"
                  color="primary"
                >
                  Vio
                </Button>

              </ButtonGroup>

              { this.renderFeedback('buyer') }
            </Col>
          </div>

          <div className="action-button-wrapper">

            <Col>
              <div>
                <Col xs="12">
                  <Button
                    type="submit"
                    onClick={e => this.submitPayementItem(e)}
                    disabled={
                      isSubmitting
                      || (errors && Object.values(errors).some(s => s.message !== undefined))
                      || this.emptyState()
                    }
                  >
                    { isSubmitting ? 'Loading' : buttonValue }
                  </Button>
                </Col>
              </div>
            </Col>

            <Col>
              <div className="button-align">
                <Col xs="12">
                  { this.renderActionButton() }
                </Col>
              </div>
            </Col>

          </div>

        </form>
      </div>
    );
  }
};
