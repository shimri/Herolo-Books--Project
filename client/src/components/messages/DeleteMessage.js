import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {closeMessage,deleteMessage} from '../../actions';
import PropTypes from 'prop-types';

class DeleteMessage extends Component {
  state = {
    visible: this.props.active_message ? true : false
  }

handleDismiss = () => {
  this.setState({ visible: false })
  this.props.deleteMessage()
}
componentWillReceiveProps(nextProps) {

    this.setState({
      visible:nextProps.active_message
    });
    this.timer = setTimeout(() => {
      this.props.deleteMessage()
      clearInterval(this.timer);
    }, 3000);
}

  render() {
    if (this.state.visible) {
      return (
        <Message
          negative
          onDismiss={this.handleDismiss}
          header='Book Deleted'
          content='You have been deleted a book.'
        />
      )
    }

    return (
      <div>
      </div>
    )
  }
}

DeleteMessage.propTypes = {
  closeMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    active_message: state.messages
  }
}


export default connect(mapStateToProps,{closeMessage,deleteMessage})(DeleteMessage);
