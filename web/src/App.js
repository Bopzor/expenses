import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import moment from 'moment';

import { ListPage } from './components/ListPage';
import { InputPage } from './components/InputPage';
import ExpensePage from './components/ExpensePage';
import AdvancePage from './components/AdvancePage';

const App = () => {
  return (
    <div className="App">

      <Switch>
        <Route path={"/list/expenses/:year/:month"} render={
          props => (
            <ListPage
              year={props.match.params.year}
              month={props.match.params.month}
              payementType="expense"
            />
          )
        } />

        <Route path={"/list/advances/:year/:month"} render={
          props => (
            <ListPage
              year={props.match.params.year}
              month={props.match.params.month}
              payementType="advance"
            />
          )
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

        <Redirect from="/" to={`/add/${moment().format('YYYY')}/${moment().format('MM')}/expense`} />
      </Switch>

      <Route exact path="/list/:payementType?/:year?"
        render={props => <Redirect to={`/list/expenses/${moment().format('YYYY')}/${moment().format('MM')}`} />}
      />


    </div>

  );
}

export default App;
