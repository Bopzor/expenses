import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { AdvanceInput } from './containers/advanceInput';
import { Header } from './header';
import { Total } from './containers/total';

class AdvancePage extends Component {
  state = {
    advance: this.props.advances.filter(a => a.id === parseInt(this.props.id))[0],
  }

  render() {
    const { advance } = this.state;

    return (
      <div>
        <Header year={moment(advance.date).format('YYYY')} month={moment(advance.date).format('MM')} />

        <AdvanceInput payementType="advance" payementItem={advance} />

        <Total
          className="fixed-bottom"
          year={moment(advance.date).format('YYYY')}
          month={moment(advance.date).format('MM')}
        />
      </div>
    );

  }
};

const mapStateToProps = state => ({
  advances: state.advances.list,
});

export default connect(mapStateToProps)(AdvancePage);
