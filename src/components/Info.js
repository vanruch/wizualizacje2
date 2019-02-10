import React, {Component} from 'react';
import Description from './Description';
import Legend from './Legend';

export class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  render() {
    return <div>
      <button id='info_toggle' onClick={() => this.setState({visible: !this.state.visible})}>
        {this.state.visible ? 'Schowaj info' : 'Pokaż info'}
      </button>
      <div style={
        {
          position: 'relative',
          display: (this.state.visible ? 'block' : 'none'),
          background: 'white',
          zIndex: 10
        }
      }>
        <Description/>
      </div>
    </div>;
  }
}
