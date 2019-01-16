import React, { Component } from 'react';

import Month from './components/month';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Month />
      </div>

    );
  }
}

export default App;
