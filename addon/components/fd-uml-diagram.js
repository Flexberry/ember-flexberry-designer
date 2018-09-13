/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import joint from 'npm:jointjs';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';

/**
  Component for working with the UML diagram through the JointJS.

  @class FdUmlDiagramComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Ember.Component.extend({
  /**
    All primitives of the UML diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: undefined,

  /**
    All elements of the UML diagram.

    @property elements
    @type Ember.Array
  */
  elements: Ember.computed.filter('primitives', p => p instanceof FdUmlElement),

  /**
    All a links of the UML diagram.

    @property links
    @type Ember.Array
  */
  links: Ember.computed.filter('primitives', p => p instanceof FdUmlLink),

  /**
    Indicates that the diagram has primitives.

    @property notEmpty
    @type Boolean
  */
  notEmpty: Ember.computed.notEmpty('primitives'),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method init
  */
  init() {
    this._super(...arguments);

    this.set('graph', new joint.dia.Graph());
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);

    let elements = this.get('elements');
    let links = this.get('links');

    let height = '100%';
    let width = '100%';
    if (this.get('notEmpty')) {
      height = Math.max.apply(null, elements.map(e => e.get('y') + e.get('height'))) + 100;
      width = Math.max.apply(null, elements.map(e => e.get('x') + e.get('width'))) + 100;
    }

    let graph = this.get('graph');
    let paper = new joint.dia.Paper({
      el: this.get('element'),
      height: height,
      width: width,
      model: graph,
    });
    paper.options.connectionStrategy = joint.connectionStrategies.pinAbsolute;

    graph.addCells(elements.map(e => e.JointJS(graph)));
    graph.addCells(links.map(l => l.JointJS(graph)));
  },
});
