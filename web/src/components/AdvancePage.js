import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { AdvanceInput } from './containers/AdvanceInput';
import { Header } from './Header';
import { Total } from './containers/Total';

class AdvancePage extends Component {
  state = {
    advance: this.props.advances.filter(a => a.id === parseInt(this.props.id))[0],
  }

  render() {
    const { advance } = this.state;
    const year = moment(advance.date).format('YYYY');
    const month = moment(advance.date).format('MM');

    return (
      <div>
        <Header year={year} month={month} />

        <AdvanceInput payementType="advance" payementItem={advance} />

        <Total year={year} month={month} />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  advances: state.advances.list,
});

export default connect(mapStateToProps)(AdvancePage);
