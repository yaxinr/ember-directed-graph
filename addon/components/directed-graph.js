import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import dagre from 'dagre'
import { htmlSafe } from '@ember/template';

export default class DirectedGraphComponent extends Component {
  @tracked nodes = []
  @tracked steps = []
  @tracked svgWidth = 800
  @tracked svgHeight = 500
  @action draw(element, [nodes, steps]) {
    nodes ||= []
    var g = new dagre.graphlib.Graph();

    // Set an object for the graph label
    g.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function () { return {}; });
    const fontWidth = 7;
    const height = 30;

    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    nodes.forEach(n => g.setNode(n.id, { label: n.label, width: n.label.length * fontWidth, height }))
    steps.mapBy('start').concat(steps.mapBy('finish')).uniq()
      .filter(n => !g.hasNode(n))
      .forEach(label => g.setNode(label, { label, width: label.length * fontWidth, height }))

    // // Add edges to the graph.
    steps.forEach(step => g.setEdge(step.start, step.finish))

    dagre.layout(g);
    // g.nodes().forEach(function (v) {
    //   console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
    // });
    this.nodes = g.nodes().map(id => {
      let node = g.node(id)
      node.id = id
      node.x -= node.label.length * fontWidth / 2
      node.y -= height / 2
      node.style = htmlSafe(`position:absolute;left:${node.x}px;top:${node.y}px;`)
      return node
    })
    // g.edges().forEach(function (e) {
    //   console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
    // });
    let edges = g.edges()
    this.steps = edges.map(e => g.edge(e).points.map(p => `${p.x} ${p.y}`).join(','));
    const maxPoint = (edges, g, prop) => Math.max(...edges.map(e => Math.max(...g.edge(e).points.mapBy(prop)))) + 100
    this.svgWidth = maxPoint(edges, g, 'x')
    this.svgHeight = maxPoint(edges, g, 'y')
  }
}
