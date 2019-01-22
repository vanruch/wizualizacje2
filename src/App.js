import React, {Component} from 'react';
import Graph from 'vis-react';
import './App.css';
import data from './data/cleanedup';
import Modal from 'react-modal';
import Iframe from 'react-iframe';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Description from "./components/Description";
import Title from "./components/Title";
import Authors from "./components/Authors";
import Legend from "./components/Legend";

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
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=125944'
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
  'https://genealogy.math.ndsu.nodak.edu/id.php?id=12682'
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
  interaction:{hover:true},
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
    this.state = {isPaneOpen: false, isPaneOpened: false};
    this.events = {
      select: this.selectNode.bind(this),
      hoverNode: () => {document.body.style.cursor = 'pointer'},
      blurNode: () => {document.body.style.cursor = 'default'},
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

  render() {
    return (
      <div ref={ref => this.el = ref} id='tmp'>
        <Title />
        <Description />
        <Legend />
        <Authors />
        <Graph graph={graph} options={options} events={this.events}/>
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
