import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAlert } from '../../redux/actions/alert';

class Alert extends Component {

  render() {
   
    return (
      <div>
        {
          <div key={this.props.id} className={`alert alert-${this.props.alertType}`}>
            {this.props.msg}
          </div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    msg: state.alert.msg,
    alertType: state.alert.alertType,
    id: state.alert.id
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      alerts: bindActionCreators(setAlert, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
