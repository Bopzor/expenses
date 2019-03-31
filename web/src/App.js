import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import moment from 'moment';

import { Month } from './components/month';
import { InputPage } from './components/inputPage';
import ExpensePage from './components/expensePage';
import AdvancePage from './components/advancePage';

const App = () => {
  return (
    <div className="App">

      <Switch>
        <Route path={"/list/expenses/:year/:month"} render={
          props => <Month year={props.match.params.year} month={props.match.params.month} payementType="expense" />
        } />

        <Route path={"/list/advances/:year/:month"} render={
          props => <Month year={props.match.params.year} month={props.match.params.month} payementType="advance" />
        } />

        <Route path="/expense/:id" render={
          props => <ExpensePage id={props.match.params.id} />
        } />

        <Route path="/advance/:id" render={
          props => <AdvancePage id={props.match.params.id} />
        } />

        <Route
          path="/add/:year/:month"
          render={props => <InputPage year={props.match.params.year} month={props.match.params.month} />}
        />
      </Switch>

      <Route exact path="/list/:payementType?/:year?"
        render={props => <Redirect to={`/list/expenses/${moment().format('YYYY')}/${moment().format('MM')}`} />}
      />

      <Route
        exact path="/"
        render={props => <Redirect to={`/add/${moment().format('YYYY')}/${moment().format('MM')}/expense`} />}
      />

    </div>

  );
}

export default App;
