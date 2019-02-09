import React, {Component} from 'react';
import Graph from 'vis-react';
import './App.css';
import data from './data/cleanedup';
import Modal from 'react-modal';
import Iframe from 'react-iframe';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Description from './components/Description';
import Title from './components/Title';
import Authors from './components/Authors';
import Legend from './components/Legend';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';

const pwWorkers = [
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=162783',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=125997',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=193607',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=193607',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=162216',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=126078',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=165970',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=126085',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=137002',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=126075',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=125944',
  'https://www.genealogy.math.ndsu.nodak.edu/id.php?id=189855',
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=125947",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_rutkowski_marek/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_ferenstein_elzbieta/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_szablowski_pawel/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_szpojankowski_kamil/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_kolodziejek_bartosz/",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=185993",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=125996",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_krasnosielska-kobos_anna/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_matysiak_wojciech/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_swieca_marcin/",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=130383",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=100956",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=130278",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=134775",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=75416",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=143963",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_debski_michal/",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=165965",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=165969",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=193606",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_nieweglowski_mariusz/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_janeczko_stanislaw/",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=126080",
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=126083",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_syga_monika/",
  "https://ww2.mini.pw.edu.pl/wydzial/pracownicy/prac_lesniewski_krzysztof/"
];
const lwiw = [
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12681',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=28292',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=17851',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=13056',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=132815',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=51907',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=123308',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=43524',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=89841',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=60311',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12682',
  "https://genealogy.math.ndsu.nodak.edu/id.php?id=7383"
];
const waw = [
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=24546',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12548',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=7643',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=86692',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12547',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=489',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12545',
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=13347'
];

const selectBordedColor = (url) => {
  if (pwWorkers.includes(url)) {
    return 'green';
  }
  if (lwiw.includes(url)) {
    return 'yellow';
  }
  if (waw.includes(url)) {
    return 'red';
  }
  return false;
};

const graph = {
  nodes: data.nodes.map(node => ({
    id: node.v,
    label: node.value.name.replace(' ', '\n'),
    borderWidth: selectBordedColor(node.v) ? 3 : 0,
    color: {
      border: selectBordedColor(node.v)
    },
    shapeProperties: {
      interpolation: false    // 'true' for intensive zooming
    },
    shape: 'circularImage',
    image: node.value.image || 'https://marybrand.ru/pictures/good_id2153.jpg',
    brokenImage: 'https://marybrand.ru/pictures/good_id2153.jpg'
  })),
  edges: data.edges.map(edge => ({from: edge.v, to: edge.w}))
};

const people = graph.nodes.map(x => ({value: x.id, label: x.label}));
people.unshift({value: 'all', label: 'Wszyscy'});

function reducedGraph(root, depth) {
  function extend(current) {
    let extended = current.slice();

    for (let c of current) {
      for (let e of graph.edges) {
        if (c.id === e.from) {
          extended.push(find(e.to));
        } else if (c.id === e.to) {
          extended.push(find(e.from));
        }
      }
    }

    return distinct(extended);
  }

  function find(id) {
    return graph.nodes.find(x => x.id === id);
  }

  function distinct(values) {
    return values.filter((v, i) => values.indexOf(v) === i);
  }

  let nodes = (root.value === 'all') ? graph.nodes.slice() : [find(root.value)];
  for (let i = 0; i < depth; i++) {
    nodes = extend(nodes);
  }

  let edges = [];
  for (let edge of graph.edges) {
    if (nodes.find(x => x.id === edge.from) && nodes.find(x => x.id === edge.to)) {
      edges.push(edge);
    }
  }

  return {
    nodes: nodes,
    edges: edges
  };
}

const mapping = data.nodes.reduce((acc, {v, value}) => ({...acc, [v]: value}), {});

var options = {
  layout: {
    improvedLayout: false,
    hierarchical: {
      enabled: true,
      sortMethod: 'directed',
      nodeSpacing: 150,
      blockShifting: false
    }
  },
  interaction: {hover: true},
  // physics: {
  //   // enabled: false,
  //   solver: 'hierarchicalRepulsion',
  //   hierarchicalRepulsion: {
  //     nodeDistance: 150
  //   }
  // },
  edges: {
    color: '#000000'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isPaneOpen: false, isPaneOpened: false, person: {value: 'all', label: 'Wszyscy'}, depth: 10};
    this.events = {
      select: this.selectNode.bind(this),
      hoverNode: () => {document.body.style.cursor = 'pointer';},
      blurNode: () => {document.body.style.cursor = 'default';}
    };
  }

  componentDidMount() {
    Modal.setAppElement(this.el);
  }

  selectNode(event) {
    document.body.style.cursor = 'default';
    const {nodes} = event;
    if (nodes[0]) {
      const val = mapping[nodes[0]];
      setTimeout(() => this.setState({isPaneOpened: true}), 100);
      this.setState({isPaneOpen: true, url: val.wikiUrl || nodes[0], name: val.name});
    } else {
      this.setState({isPaneOpen: false, isPaneOpened: false});
    }
  }

  mobilizeWikiUrl(url) {
    if (url && url.includes('wikipedia')) {
      return url.replace('pl.', 'pl.m.');
    }
    return url;
  }

  onPersonChange(person) {
    this.setState({...this.state, person: person});
  }

  onValueChange(value) {
    this.setState({...this.state, depth: value});
  }

  render() {
    return (
      <div ref={ref => this.el = ref} id='tmp'>
        {!this.state.isPaneOpen &&
        <div id="controls">
          <Select options={people} onChange={e => this.onPersonChange(e)} value={this.state.person}/>
          <NumericInput id="numeric" min={1} max={10} onChange={e => this.onValueChange(e)} value={this.state.depth}/>
        </div>}
        <Title/>
        <Description/>
        <Legend/>
        <Authors/>
        <Graph graph={reducedGraph(this.state.person, this.state.depth)} options={options} events={this.events}/>
        <SlidingPane
          isOpen={this.state.isPaneOpen}
          title={this.state.name}
          onRequestClose={() => {
            this.state.isPaneOpened && this.setState({isPaneOpen: false, isPaneOpened: false});
          }}>
          <Iframe url={this.mobilizeWikiUrl(this.state.url)}
                  width="100%"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  styles={{minHeight: '100%'}}
                  position="relative"
                  allowFullScreen/>
        </SlidingPane>
      </div>
    );
  }
}

export default App;
