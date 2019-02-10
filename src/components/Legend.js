import React, {Component} from 'react';
import "react-vis/dist/styles/legends.scss"

import {DiscreteColorLegend} from 'react-vis';

const ITEMS = [
  {title: 'Lwowska Szkoła Matematyczna', color: 'yellow', strokeWidth: 10},
  {title: 'Warszawska Szkoła Matematyczna', color: 'red', strokeWidth: 10},
  {title: 'Pracownicy MiNI', color: 'green', strokeWidth: 10},
  {title: 'Pozostali', color: 'grey', strokeWidth: 10}
];

class Legend extends Component {
  render() {
    return (
      <div>
        <DiscreteColorLegend width={300} items={ITEMS} />
      </div>
    );
  }
}

export default Legend;
