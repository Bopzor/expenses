import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";

import Month from './components/month';
import Total from './components/containers/total';
import InputPage from './components/inputPage';
import ExpensePage from './components/expensePage';
import AdvancePage from './components/advancePage';

class App extends Component {
  state = {
    dateFilter: new Date(),
  }

  changeDateFilter(date) {
    this.setState({ dateFilter: new Date(date) });
  }

  render() {
    return (
      <div className="App">

        <Switch>
          <Route path="/month" render={
            props => <Month dateFilter={this.state.dateFilter} changeDate={date => this.changeDateFilter(date)} />
          } />

          <Route path="/expense/:id" render={
            props => <ExpensePage id={props.match.params.id} date={this.state.dateFilter} changeDate={date => this.changeDateFilter(date)} />
          } />

          <Route path="/advance/:id" render={
            props => <AdvancePage id={props.match.params.id} date={this.state.dateFilter} changeDate={date => this.changeDateFilter(date)} />
          } />

          <Route path="/" render={
            props => <InputPage date={this.state.date} dateFilter={this.state.dateFilter} changeDate={date => this.changeDateFilter(date)} />
          } />
        </Switch>

        <Total dateFilter={this.state.dateFilter} className="fixed-bottom" />
      </div>

    );
  }
}

export default App;
