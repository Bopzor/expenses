import React from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './PayementItemInput.css';

import {
  Row,
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
      formErrors: [],
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
      formErrors: [],
    });
  }

  async validateForm() {
    const errors = [];

    if (this.state.description === '') {
      errors.push({ param: 'description', msg: 'This field is required.' });
    }

    if (this.state.cost === '') {
      errors.push({ param: 'cost', msg: 'This field is required.' });

    } else if (isNaN(this.state.cost)) {
      errors.push({ param: 'cost', msg: 'This field must be an number.' });
    }

    if (this.state.buyer !== 'Nils' && this.state.buyer !== 'Vio') {
      errors.push({ param: 'buyer', msg: `You must select one buyer.` });
    }

    return new Promise(resolve => this.setState({ formErrors: errors }, resolve));
  }

  async submitPayementItem(event) {
    event.preventDefault();
    event.stopPropagation();

    await this.validateForm();

    if (this.state.formErrors.length > 0)
      return;

    let redirect = (this.props.payementType === 'advance'
      ? `/list/advances/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
      : `/list/expenses/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`
    );

    if (!this.props.payementItem) {
      await this.props.createPayementItem(this.state);
      await this.validateForm();

      if (this.props.errors === null) {
        this.setState({ redirect });

      } else {
        this.setState({ formErrors: this.props.errors.errors })
      }

    } else {
      await this.props.editPayementItem(this.state);
      await this.validateForm();

      if (this.props.errors === null) {
        this.setState({ redirect });

      } else {
        this.setState({ formErrors: this.props.errors.errors })
      }
    }
  }

  onDateChange(event) {
    this.setState({ date: event.target.value.toString() });
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value }, () => this.validateForm());
  }

  onCostChange(event) {
    this.setState({ cost: event.target.value }, () => this.validateForm());
  }

  buyerChange(buyer) {
    this.setState({ buyer }, () => this.validateForm());
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
      formErrors: [],
    })
  }

  onCancelUpdate() {
    let redirect = this.props.payementType === 'advance' ?
      `/list/advances/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}` :
      `/list/expenses/${moment(this.state.date).format('YYYY')}/${moment(this.state.date).format('MM')}`;

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

  renderFeedback(index) {
    if (index < 0) {
      return null;
    }

    return (
      <div className="feedback">
        {this.state.formErrors[index].msg}
      </div>
    )
  }

  render() {
    const buttonValue = this.props.payementItem ? 'Edit' : 'Add';

    const dateErrorIdx = this.state.formErrors.findIndex(i => i.param === 'date');
    const descriptionErrorIdx = this.state.formErrors.findIndex(i => i.param === 'description');
    const costErrorIdx = this.state.formErrors.findIndex(i => i.param === 'cost');
    const buyerErrorIdx = this.state.formErrors.findIndex(i => i.param === 'buyer');

    if (this.state.redirect !== '') {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="form-flex">
        <form onSubmit={e => this.submitPayementItem(e)}>
          <div>
            <Label for="date" xs={2}>Date</Label>
            <Col xs="12">
              <Input
                type="date"
                value={this.state.date}
                placeholder={this.state.date}
                onChange={e => this.onDateChange(e)}
                invalid={dateErrorIdx >= 0}
              />

              {this.renderFeedback(dateErrorIdx)}

            </Col>
          </div>

          <div>
            <Col xs="12">
              <Label for="description">Description</Label>
              <Input
                type="text"
                placeholder='description'
                value={this.state.description}
                onChange={e => this.onDescriptionChange(e)}
                invalid={descriptionErrorIdx >= 0}
                />

              {this.renderFeedback(descriptionErrorIdx)}

            </Col>
          </div>

          <div>
            <Col xs="12">
            <Label for="cost">Cost</Label>
              <Input
                type="number"
                placeholder='€'
                value={this.state.cost}
                onChange={e => this.onCostChange(e)}
                invalid={costErrorIdx >= 0}
                />

              {this.renderFeedback(costErrorIdx)}

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
                  active={this.state.buyer === 'Nils'}
                  outline={this.state.buyer !== 'Nils'}
                  className="buyer"
                  color="warning"
                  >
                  Nils
                </Button>

                <Button
                  type="button"
                  onClick={() => this.buyerChange('Vio')}
                  active={this.state.buyer === 'Vio'}
                  outline={this.state.buyer !== 'Vio'}
                  className="buyer"
                  color="primary"
                >
                  Vio
                </Button>

              </ButtonGroup>

              {this.renderFeedback(buyerErrorIdx)}
            </Col>
          </div>

          <Row className="action-button-wrapper">

            <Col>
              <div>
                <Col xs="12">
                  <Button
                    type="submit"
                    onClick={e => this.submitPayementItem(e)}
                    disabled={this.props.isSubmitting || this.state.formErrors.length > 0}
                  >
                    {this.props.isSubmitting ? 'Loading' : buttonValue}
                  </Button>
                </Col>
              </div>
            </Col>

            <Col>
              <div>
                <Col xs="12">
                  {this.renderActionButton()}
                </Col>
              </div>
            </Col>

          </Row>

        </form>
      </div>
    );
  }
};
