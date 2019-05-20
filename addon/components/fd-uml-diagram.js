/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import $ from 'jquery';
import joint from 'npm:jointjs';
import uuid from 'npm:node-uuid';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';

/**
  Component for working with the UML diagram through the JointJS.

  @class FdUmlDiagramComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Component.extend({
  /**
    Store of current application.

    @property store
    @type DS.Store or subclass
  */
  store: service('store'),

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
   Array items with empty reference count.

   @property emptyReferenceCountItems
   @type {Array}
   */
  emptyReferenceCountItems: A(),

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

    paper.on('class:updaterepobj', this._updateRepObj, this);
    paper.on('class:checkexistname', this._checkExistNameClass, this);

    let linkConnectorsIds = A();
    graph.addCells(elements.map(e => {
      let element = e.JointJS();
      if (element.prop('type') === 'flexberry.uml.LinkConnector') {
        linkConnectorsIds.addObject(element.prop('id'));
      }

      return element;
    }));

    graph.addCells(links.map(function(l) {
      let link = l.JointJS();
      switch (link.prop('type')) {
        case 'flexberry.uml.Aggregation':
        case 'flexberry.uml.Association':
        case 'flexberry.uml.Generalization':
        case 'flexberry.uml.LinkInheritance':
          if (this.includes(link.prop('source/id'))) {
            link.attr('.marker-arrowhead-group-source', {'display':'none'});
            link.attr('.tool-remove', {'display':'none'});
          }

          if (this.includes(link.prop('target/id'))) {
            link.attr('.marker-arrowhead-group-target', {'display':'none'});
            link.attr('.tool-remove', {'display':'none'});
          }
      }

      return link;
    },
      linkConnectorsIds
    ));
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
  },

  /**
    Update repositoryObject by objectModel.

    @method _updateRepObj
    @param {Boolean} objectModel model diagrams object.
   */
  _updateRepObj(objectModel) {
    let store = this.get('store');
    let allClasses = store.peekAll('fd-dev-class');
    let repositoryObjectId = objectModel.get('repositoryObject');
    if (isNone(repositoryObjectId)) {
      return;
    }

    let repositoryObject = allClasses.findBy('id', repositoryObjectId.slice(1, -1));
    if (isNone(repositoryObject)) {
      return;
    }

    let props = objectModel.getProperties('name', 'stereotype', 'attributes', 'methods');
    repositoryObject.setProperties({
      name: props.name,
      stereotype: props.stereotype,
      attributesStr: props.attributes.join('\n'),
      methodsStr: props.methods.join('\n')
    });
  },

  /**
    Find exist class by name.

    @method _checkExistNameClass
    @param {Boolean} objectModel model diagrams object.
   */
  _checkExistNameClass(objectModel) {
    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    let repositoryObjectId = objectModel.get('repositoryObject');
    if (isNone(repositoryObjectId)) {
      return;
    }

    let currentClass = allClasses.findBy('id', objectModel.get('repositoryObject').slice(1, -1));
    if (isNone(currentClass)) {
      return;
    }

    let objectModelName = objectModel.get('name');
    let originalClass = classesCurrentStage.findBy('name', objectModelName);

    if (!isNone(originalClass)) {
      this._decrementPropertyReferenceCount(currentClass);
      this._incrementPropertyReferenceCount(originalClass);

      objectModel.set('repositoryObject', `{${originalClass.get('id')}}`);
      objectModel.set('stereotype', originalClass.get('stereotype'));
      objectModel.set('methods', originalClass.get('methodsStr').split('\n'));
      objectModel.set('attributes', originalClass.get('attributesStr').split('\n'));
    } else if (!currentClass.get('isNew') || currentClass.get('referenceCount') > 1) {
      this._decrementPropertyReferenceCount(currentClass);
      let newClass = store.createRecord('fd-dev-class', {
        id: uuid.v4(),
        stage: stage,
        caption: objectModelName,
        description: objectModelName,
        name: objectModelName,
        nameStr: objectModelName,
      });

      this._incrementPropertyReferenceCount(newClass);
      objectModel.set('repositoryObject', `{${newClass.get('id')}}`);
      objectModel.set('stereotype', '');
      objectModel.set('methods', A(''));
      objectModel.set('attributes', A(''));
    } else {
      currentClass.set('name', objectModelName);
    }
  },

  /**
    DecrementProperty for referenceCount property.

    @method _decrementPropertyReferenceCount
    @param {Object} item model class object.
   */
  _decrementPropertyReferenceCount(item) {
    let newValue = item.decrementProperty('referenceCount');
    if (newValue === 0) {
      this.get('emptyReferenceCountItems').pushObject(item);
    }
  },

  /**
    IncrementProperty for referenceCount property.

    @method _incrementPropertyReferenceCount
    @param {Object} item model class object.
   */
  _incrementPropertyReferenceCount(item) {
    let newValue = item.incrementProperty('referenceCount');
    if (newValue === 1) {
      let emptyReferenceCountItems = this.get('emptyReferenceCountItems');
      emptyReferenceCountItems.removeObject(item);
    }
  }
});
