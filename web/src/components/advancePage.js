import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdvanceInput from './containers/advanceInput';
import Header from './header';

class AdvancePage extends Component {
  state = {
    advance: this.props.advances.filter(a => a.id == this.props.id)[0],
  }

  render() {
    const { advance } = this.state;

    return (
      <div>
        <Header date={new Date()} changeDate={date => this.props.changeDate(date)} />

        <AdvanceInput payementType="advance" payementItem={advance} />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  advances: state.advances.list,
});

export default connect(mapStateToProps)(AdvancePage);
