import React from 'react';

import { connect } from 'react-redux';
import { createExpense, editExpense } from '../redux/actions';

import { Row, Col, Button, Form, FormGroup, Input, Label } from 'reactstrap';

class InputExpense extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      description: '',
      cost: '',
      buyer: '',
      initialized: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.expense === undefined || prevState.initialized)
      return null;

    return ({
      date: nextProps.expense.date,
      description: nextProps.expense.description,
      cost: nextProps.expense.cost,
      buyer: nextProps.expense.buyer,
      id: nextProps.expense.id,
      initialized: true,
    });
  }

  submitExpense(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props.expense) {
      this.props.createExpense(this.state);
    } else {
      this.props.editExpense(this.state).then(this.props.onEditingFinish(this.state));
    }
  }

  dateChange(e) {
    this.setState({ date: e.target.value.toString() });
  }

  descriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  costChange(e) {
    this.setState({ cost: e.target.value });
  }

  buyerChange(e) {
    this.setState({ buyer: e.target.value });
  }

  render() {
    const buttonValue = this.props.expense ? 'Edit' : 'Add';

    return (
      <Form onSubmit={e => this.submitExpense(e)}>
        <Row form>

          <Col>
            <FormGroup>
              <Label for="date" hidden>Date</Label>
              <Input
                type='date'
                value={this.state.date}
                placeholder={this.state.date}
                onChange={e => this.dateChange(e)}
                onClick={e => e.stopPropagation()}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="description" hidden>Description</Label>
              <Input
                type='text'
                placeholder='description'
                value={this.state.description}
                onClick={e => e.stopPropagation()}
                onChange={e => this.descriptionChange(e)}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="cost" hidden>Cost</Label>
              <Input
                type='text'
                placeholder='€'
                value={this.state.cost}
                onClick={e => e.stopPropagation()}
                onChange={e => this.costChange(e)}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="buyer" hidden>Buyer</Label>
              <Input
                type="select"
                value={this.state.buyer}
                onChange={e => this.buyerChange(e)}
                onClick={e => e.stopPropagation()}
              >
                <option value='' disabled hidden />
                <option value='Nils'>Nils</option>
                <option value='Vio'>Vio</option>
              </Input>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Button type="submit" onClick={e => this.submitExpense(e)} disabled={this.props.isSubmitting}>
                {this.props.isSubmitting ? 'Loading' : buttonValue}
              </Button>
            </FormGroup>
          </Col>

        </Row>
      </Form>
    );
  }
};

const mapsStateToProps = state => ({
  isSubmitting: state.addingExpense,
});

const mapDispatchToProps = dispatch => ({
  createExpense: body => dispatch(createExpense(body)),
  editExpense: body => dispatch(editExpense(body)),
});

export default connect(mapsStateToProps, mapDispatchToProps)(InputExpense);