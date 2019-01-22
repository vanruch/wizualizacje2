import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip'
import Legend from './Legend';

class Title extends Component {
  render() {
    return (
      <div id="title">
        <div>
          <h3>MiNI Korzenie</h3>
          <a data-tip id="tooltip" data-for='tooltip-body'>?</a>
          <ReactTooltip id='tooltip-body' place="bottom" type="dark" effect="solid">
            <div id='tooltip-text'>
              <p>Drzewo genealogicznie pokazujące związki między współczesnymi pracownikami wydziału Matematyki i Nauk Informacyjnych Politechniki Warszawskiej  a Warszawską i Lwowską szkołą matematyczną. Szkoły te razem z Krakowską szkołą matematyczną tworzą  polską szkołę matematyczną, czyli środowisko matematyków działających w Polsce w latach 1918-1939.</p>
              <p>Fakt, że osoba jest potomkiem innej osoby w drzewie oznacza, że była jej doktorantem/doktorantką.</p>
              <Legend/>
            </div>
          </ReactTooltip>
        </div>
      </div>
    );
  }
}

export default Title;
