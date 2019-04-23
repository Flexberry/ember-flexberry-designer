/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import $ from 'jquery';
import joint from 'npm:jointjs';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';

/**
  Component for working with the UML diagram through the JointJS.

  @class FdUmlDiagramComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Component.extend({
  /**
    Current paper

    @property paper
    @default undefined
  */
  paper: undefined,

  /**
    Created clean Link object to begin drag

    @property draggedLink
    @default undefined
  */
  draggedLink: undefined,

  /**
    View of dragged link

    @property draggedLinkView
    @default undefined
  */
  draggedLinkView: undefined,

  /**
    All primitives of the UML diagram.

    @property primitives
    @type Ember.Array
  */
  primitives: undefined,

  /**
    True when link adding in process.

    @property isLinkAdding
    @type Boolean
  */
  isLinkAdding: false,

  /**
    All elements of the UML diagram.

    @property elements
    @type Ember.Array
  */
  elements: computed.filter('primitives', p => p instanceof FdUmlElement),

  /**
    All a links of the UML diagram.

    @property links
    @type Ember.Array
  */
  links: computed.filter('primitives', p => p instanceof FdUmlLink),

  /**
    Indicates that the diagram has primitives.

    @property notEmpty
    @type Boolean
  */
  notEmpty: computed.notEmpty('primitives'),

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

    this.set('isLinkAdding', false);
    this.set('paper', paper);
    paper.options.connectionStrategy = joint.connectionStrategies.pinAbsolute;
    paper.on('blank:pointerclick', this._blankPointerClick, this);
    paper.on('element:pointerclick', this._elementPointerClick, this);
    paper.on('blank:contextmenu', this._blankContextMenu, this);
    graph.addCells(elements.map(e => e.JointJS(graph)));
    let cells = graph.getCells();
    let linkConnectorsIds = [];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.attributes.type == "flexberry.uml.LinkConnector") {
        linkConnectorsIds.push(cell.attributes.id);
      }
    }
    graph.addCells(links.map(function(l) {
      let ret = l.JointJS(graph);
      switch (ret.attributes.type) {
        case 'flexberry.uml.Aggregation':
        case 'flexberry.uml.Association':
        case 'flexberry.uml.Generalization':
        case 'flexberry.uml.LinkInheritance':
          if (this.indexOf(ret.attributes.source.id) >= 0) {
            ret.attributes.attrs[".marker-arrowhead-group-source"]=  {"display":"none"};
          }

          if (this.indexOf(ret.attributes.target.id) >= 0) {
            ret.attributes.attrs[".marker-arrowhead-group-target"]=  {"display":"none"};
          }


      }
      return ret;
    },
      linkConnectorsIds
    )
    );
  },


  /**
    Handler event 'blank:pointerclick'.

    @method actions._blankPointerClick
    @param {jQuery.Event} e event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
   */
  _blankPointerClick(e, x, y) {
    let options = { e: e, x: x, y: y };
    let newElement = this.get('blankPointerClick')(options);
    this._addNewElement(newElement);
  },

  /**
    Handler event 'element:pointerclick'.

    @method actions._elementPointerClick
    @param {Object} element selected joint js element.
    @param {jQuery.Event} e event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
  */
  _elementPointerClick(element, e, x, y) {
    let options = { element: element, e: e, x: x, y: y };
    if (isNone(this.get('draggedLink'))) {
      let newElement = this.get('startDragLink')(options);
      if (!isNone(newElement)) {
        this.set('draggedLink', newElement);
        let graph = this.get('graph');
        let paper = this.get('paper');

        let linkView = newElement
          .set({ 'target': { x: x, y: y } })
          .addTo(graph).findView(paper);

        this.set('isLinkAdding', true);

        graph.getLinks().map(link => {
          link.findView(paper).$el.addClass('edit-disabled');
        }, this);

        $(paper.el).find('input,textarea').addClass('click-disabled');

        $(document).on({
          'mousemove.example': this._onDrag.bind(this)
        }, {
          paper: paper,
          element: newElement
        });

        this.set('draggedLinkView', linkView);
      }
    } else {
      if (this.get('endDragLink')(options)) {
        this._clearLinksData();
      }
    }
  },

  /**
    Handler event 'blank:contextmenu'.

    @method actions._blankContextMenu
    @param {jQuery.Event} e event.
  */
  _onDrag(evt) {
    evt.data.paper.snapToGrid({
      x: evt.clientX,
      y: evt.clientY
    });
    evt.data.element.set({
      'target': { x: evt.offsetX, y: evt.offsetY },
    });
  },

  /**
    Handler event 'blank:contextmenu'.

    @method actions._blankContextMenu
    @param {jQuery.Event} e event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
  */
  _blankContextMenu(e, x, y) {
    let options = { e: e, x: x, y: y };
    if (this.get('blankContextMenu')(options)) {
      this._clearLinksData(true);
    }
  },

  /**
    Add new Element on graph.

    @method actions._addNewElement
    @param {Object} newElement joint js element.
   */
  _addNewElement(newElement) {
    if (!isNone(newElement)) {
      let graph = this.get('graph');
      graph.addCell([newElement]);
    }
  },

  /**
    Clear created link.

    @method _clearLinksData
    @param {Boolean} removeFromGraph If true, removes created link from graph.
   */
  _clearLinksData(removeFromGraph) {
    $(document).off('mousemove.example');
    let graph = this.get('graph');
    let paper = this.get('paper');
    graph.getLinks().map(link => {
      link.findView(paper).$el.removeClass('edit-disabled');
    }, this);

    $(paper.el).find('input,textarea').removeClass('click-disabled');
    if (removeFromGraph) {
      this.get('draggedLink').remove();
    }

    this.set('draggedLink', undefined);
    this.set('draggedLinkView', undefined);
    this.set('isLinkAdding', false);
  }
});
