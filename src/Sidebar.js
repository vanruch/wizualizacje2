import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SlidingPane from 'react-sliding-pane';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: props.isPaneOpen
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      isPaneOpen: nextProps.isPaneOpen,
    })
  }

  render() {
    return (
      <SlidingPane
        isOpen={ this.state.isPaneOpen }
        title='Hey, it is optional pane title.  I can be React component too.'
        subtitle='Optional subtitle.'
        onRequestClose={ () => {
          this.setState({ isPaneOpen: false });
        } }>
        <div>And I am pane content. BTW, what rocks?</div>
      </SlidingPane>
    );
  }
}

Sidebar.propTypes = {};
Sidebar.defaultProps = {};

export default Sidebar;
