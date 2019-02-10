import React from 'react';

import { Redirect } from 'react-router-dom';

import { formatDateForInput } from '../../utilities';

import './payementItemInput.css';

import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

class PayementItemInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: props.date ? formatDateForInput(new Date()) : '',
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
      errors.push({ field: 'description', message: 'This field is required.' });
    }

    if (this.state.cost === '') {
      errors.push({ field: 'cost', message: 'This field is required.' });

    } else if (isNaN(this.state.cost)) {
      errors.push({ field: 'cost', message: 'This field must be an number.' });
    }

    if (this.state.buyer !== 'Nils' && this.state.buyer !== 'Vio') {
      errors.push({ field: 'buyer', message: `You must select one buyer.` });
    }

    return new Promise(resolve => this.setState({ formErrors: errors }, resolve));
  }

  async submitPayementItem(e) {
    e.preventDefault();
    e.stopPropagation();

    await this.validateForm();

    if (this.state.formErrors.length > 0)
      return;

    let redirect = this.props.payementType === 'advance' ?
      '/month/advances' :
      '/month';

    if (!this.props.payementItem) {
      await this.props.createPayementItem(this.state);
      await this.validateForm();

      if (this.props.errors === null) {
        this.setState({ redirect })
      }

    } else {
      await this.props.editPayementItem(this.state);
      await this.validateForm();

      if (this.props.errors === null) {
        this.setState({ redirect })
      }

    }

  }

  dateChange(e) {
    this.setState({ date: e.target.value.toString() });
  }

  descriptionChange(e) {
    this.setState({ description: e.target.value }, () => this.validateForm());
  }

  costChange(e) {
    this.setState({ cost: e.target.value }, () => this.validateForm());
  }

  buyerChange(buyer) {
    this.setState({ buyer }, () => this.validateForm());
  }

  resetPayementInput() {
    this.setState({
      date: this.props.date ? formatDateForInput(new Date()) : '',
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
      '/month/advances' :
      '/month';

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
        {this.state.formErrors[index].message}
      </div>
    )
  }

  render() {
    const buttonValue = this.props.payementItem ? 'Edit' : 'Add';

    const descriptionErrorIdx = this.state.formErrors.findIndex(i => i.field === 'description');
    const costErrorIdx = this.state.formErrors.findIndex(i => i.field === 'cost');
    const buyerErrorIdx = this.state.formErrors.findIndex(i => i.field === 'buyer');

    if (this.state.redirect !== '') {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <Form onSubmit={e => this.submitPayementItem(e)}>
        <FormGroup>
          <Label for="date" xs={2}>Date</Label>
          <Col xs="12">
            <Input
              type="date"
              value={this.state.date}
              placeholder={this.state.date}
              onChange={e => this.dateChange(e)}
            />

          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs="12">
            <Label for="description">Description</Label>
            <Input
              type="text"
              placeholder='description'
              value={this.state.description}
              onChange={e => this.descriptionChange(e)}
              invalid={descriptionErrorIdx >= 0}
              />

            {this.renderFeedback(descriptionErrorIdx)}

          </Col>
        </FormGroup>

        <FormGroup>
          <Label for="cost" xs={2}>Cost</Label>
          <Col xs="12">
            <Input
              type="number"
              placeholder='€'
              value={this.state.cost}
              onChange={e => this.costChange(e)}
              invalid={this.state.formErrors.findIndex(i => i.field === 'cost') > 0}
              />

            {this.renderFeedback(costErrorIdx)}

          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs="12">
            <Label for="buyer">Buyer</Label>
            <br/>
            <ButtonGroup>

              <Button
                type="button"
                onClick={() => this.buyerChange('Nils')}
                active={this.state.buyer === 'Nils'}
                className="bg-warning"
                >
                Nils
              </Button>

              <Button
                type="button"
                onClick={() => this.buyerChange('Vio')}
                active={this.state.buyer === 'Vio'}
                className="bg-primary"
              >
                Vio
              </Button>

            </ButtonGroup>

            {this.renderFeedback(buyerErrorIdx)}
          </Col>
        </FormGroup>

        <Row>

          <Col>
            <FormGroup>
              <Col xs="12">
                <Button type="submit" onClick={e => this.submitPayementItem(e)} disabled={this.props.isSubmitting}>
                  {this.props.isSubmitting ? 'Loading' : buttonValue}
                </Button>
              </Col>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Col xs="12">
                {this.renderActionButton()}
              </Col>
            </FormGroup>
          </Col>

        </Row>

      </Form>
    );
  }
};

export default PayementItemInput;
