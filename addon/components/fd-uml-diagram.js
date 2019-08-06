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
   Service for managing objects diagram.

   @property fdDiagramService
   @type {Class}
   @default Ember.inject.service()
   */
  fdDiagramService: service('fd-diagram-service'),

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
    @default false
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
    Current highligted element.

    @property highlightedElement
    @type Object
  */
  highlightedElement: undefined,

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);

    const namespace = joint.shapes;
    let graph = this.set('graph', new joint.dia.Graph({}, { cellNamespace: namespace }));
    let paper = this.set('paper', new joint.dia.Paper({
      el: this.get('element'),
      model: graph,
      connectionStrategy: joint.connectionStrategies.pinAbsolute,
      restrictTranslate: ({ paper }) => {
        let area = paper.getArea();
        return { x: 0, y: 0, width: area.width * 2, height: area.height * 2 };
      },
      linkPinning: false,
      clickThreshold: 3,
      highlighting: {
        'default': {
          name: 'strokeAndButtons',
          options: {
            attrs: {
              'stroke-width': 3,
              stroke: '#007aff'
            }
          }
        },
        connecting: {
          name: 'stroke'
        }
      },
      interactive: {
        elementMove: false
      },
      cellNamespace: namespace
    }));

    let elements = this.get('elements');
    let links = this.get('links');
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

    let fitPaperToContent = function() {
      let fitToContent = this.get('fitToContent');
      if (!isNone(fitToContent)) {
        fitToContent();
      }
    }.bind(this);

    graph.on('add', fitPaperToContent);
    graph.on('change:position', fitPaperToContent);
    graph.on('change:size', fitPaperToContent);
    graph.on('change:source', fitPaperToContent);
    graph.on('change:target', fitPaperToContent);
    graph.on('change:vertices', fitPaperToContent);
    graph.on('remove', fitPaperToContent);
    graph.on('remove', this._removeElements, this);

    fitPaperToContent();

    paper.on('blank:pointerclick', this._blankPointerClick, this);
    paper.on('element:pointerclick', this._elementPointerClick, this);
    paper.on('blank:contextmenu', this._blankContextMenu, this);

    paper.on('updaterepobj', this._updateRepObj, this);
    paper.on('checkexistelements', this._checkOnExistElements, this);
    paper.on('cell:highlight', this._highlighted, this);
    paper.on('element:openeditform', this._elementOpenEditForm, this);

    // Ghost element mode.
    paper.on('element:pointermove', this._ghostElementMove, this);
    paper.on('element:pointerup', this._ghostElementRemove, this);

    this.get('fdDiagramService').on('updateJointObjectViewTriggered', this, this._updateJointObjectView);
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
    let highlightedElement = this.get('highlightedElement');
    if (highlightedElement) {
      highlightedElement.unhighlight();
      this.set('highlightedElement', null);
    }

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
      if (isNone(newElement)) {
        element.highlight();
      } else {
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
    Handler custom event `element:openeditform`.
    Invokes the action specified in the `openEditFormAction` property, passing it the UML-element model.

    @private
    @method _elementOpenEditForm
    @param {joint.dia.CellView} cellView
    @param {joint.dia.Element} cellView.model
  */
  _elementOpenEditForm({ model }) {
    this.get('openEditFormAction')(model.get('objectModel'));
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
    Handles cell:highlight action.

    @method _highlighted
    @param {Object} cellView joint js element.
   */
  _highlighted(cellView) {
    let highlightedElement = this.get('highlightedElement');
    if (highlightedElement && highlightedElement !== cellView) {
      highlightedElement.unhighlight();
    }

    this.set('highlightedElement', cellView);
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
    Handler event 'element:pointermove', create and mode ghost element.

    @method actions._ghostElementMove
    @param {Object} view this JoinJS object.
    @param {jQuery.Event} evt event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
  */
  _ghostElementMove(view, evt, x, y) {
    let data = evt.data;
    if (data.ghost) {
      let shift = evt.data.shift;
      data.ghost.position(x + shift.x, y + shift.y);
    } else {
      let bbox = view.model.getBBox();
      let ghost = new joint.shapes.basic.Rect();

      ghost.attr({ rect: { 'fill': 'transparent', 'stroke': '#5755a1', 'stroke-dasharray': '4,4', 'stroke-width': 2 }});
      ghost.size({height: bbox.height, width: bbox.width});
      ghost.position(bbox.x, bbox.y);

      view.model.graph.addCell(ghost);
      evt.data.ghost = ghost;
      evt.data.shift = { x: bbox.x - x, y: bbox.y - y};
    }
  },

  /**
    Handler event 'element:pointerup', delete ghost element and update link view.

    @method actions._ghostElementRemove
    @param {Object} view this JoinJS object.
    @param {jQuery.Event} evt event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
  */
  _ghostElementRemove(view, evt, x, y) {
    let data = evt.data;
    if (data.ghost) {
      let shift = evt.data.shift;
      let valueX = x + shift.x < 0 ? 0 : x + shift.x;
      let valueY = y + shift.y < 0 ? 0 : y + shift.y;
      data.ghost.remove();
      view.model.position(valueX, valueY);
      let paper = view.paper;
      let links = paper.model.getConnectedLinks(view.model);
      links.forEach((link)=> {
        let linkView = paper.findViewByModel(link);
        linkView.updateBox();
      });
    }
  },

  /**
    Update repositoryObject by objectModel.

    @method _updateRepObj
    @param {Object} objectModel model diagrams object.
    @param {String} key object propery key.
    @param {String} value new value.
   */
  _updateRepObj(objectModel, key, value) {
    let repositoryObjectId = objectModel.get('repositoryObject');
    if (isNone(repositoryObjectId)) {
      return;
    }

    let store = this.get('store');
    let modelName = this._getModelName(objectModel.get('primitive.$type'));

    let allModels = store.peekAll(`${modelName}`);
    let repositoryObject = allModels.findBy('id', repositoryObjectId.slice(1, -1));
    if (isNone(repositoryObject)) {
      return;
    }

    repositoryObject.set(`${key}`, value);
  },

  /**
    Update connected elements in repository object.

    @method _updateConnectedElements
    @param {Object} objectModel model diagrams object.
    @param {Boolean} isSourse flag.
    @param {Object} store service.
   */
  _updateConnectedElements(objectModel, isSourse, store) {
    let propName = isSourse ? 'source' : 'target';
    let keyValue = objectModel.get(`${propName}.id`);
    let primitive = this.get('primitives').findBy('id', keyValue);

    if (isNone(primitive) || primitive.get('primitive.$type') !== 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin') {
      return;
    }

    let allClass = store.peekAll('fd-dev-class');
    let newConnectedClass = allClass.findBy('id', primitive.get('repositoryObject').slice(1, -1));

    return newConnectedClass;
  },

  /**
    Find exist elements and update repository object.

    @method _checkOnExistElements
    @param {Object} objectModel model diagrams object.
    @param {Object} view this JoinJS object.
    @param {Boolean} isSourse flag.
   */
  _checkOnExistElements(objectModel, view, isSourse) {
    let repositoryObject = objectModel.get('repositoryObject');
    if (isNone(repositoryObject)) {
      return;
    }

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    let modelName = this._getModelName(objectModel.get('primitive.$type'));
    let allModels = store.peekAll(`${modelName}`);

    let repositoryObjectId = repositoryObject.slice(1, -1);
    let modelsCurrentStage = allModels.filterBy('stage.id', stage.get('id'));
    let currentRepObj = modelsCurrentStage.findBy('id', repositoryObjectId);

    let repProp;
    let newConnectedClass;
    if (!isNone(isSourse) && modelName !== 'fd-dev-class') {
      newConnectedClass = this._updateConnectedElements(objectModel, isSourse, store);
      repProp = isSourse ? (modelName === 'fd-dev-inheritance' ? 'parent' : 'startClass' ) : (modelName === 'fd-dev-inheritance' ? 'child' : 'endClass' );
    }

    let newRepObj;
    let objectModelName;
    switch (modelName) {
      case 'fd-dev-class': {
        objectModelName = objectModel.get('name');
        newRepObj = modelsCurrentStage.find(function(item) {
          let name = item.get('name');
          if (
            !isNone(name) && !isNone(objectModelName) &&
            name.toLocaleLowerCase() === objectModelName.toLocaleLowerCase() &&
            item.get('id') !== repositoryObjectId
            ) {
              return item;
            }
          });
        break;
      }
      case 'fd-dev-association':
      case 'fd-dev-aggregation': {
        let sRole = objectModel.get('startRoleTxt');
        let eRole = objectModel.get('endRoleTxt');
        let sClass = currentRepObj.get('startClass.id');
        let eClass = currentRepObj.get('endClass.id');
        objectModelName = objectModel.get('description');
        if (isSourse && !isNone(newConnectedClass)) {
          sClass = newConnectedClass.get('id');
        } else if (!isSourse && !isNone(newConnectedClass)) {
          eClass = newConnectedClass.get('id');
        }

        newRepObj = modelsCurrentStage.find(function(item) {
          let name = item.get('name');
          let startRole = item.get('startRoleStr');
          let endRole = item.get('endRoleStr');
          if (
            item.get('startClass.id') === sClass && item.get('endClass.id') === eClass && item.get('id') !== repositoryObjectId &&
            !isNone(sRole) && !isNone(startRole) && startRole.toLocaleLowerCase() === sRole.toLocaleLowerCase() &&
            !isNone(eRole) && !isNone(endRole) && endRole.toLocaleLowerCase() === eRole.toLocaleLowerCase() &&
            !isNone(objectModelName) && !isNone(name) && name.toLocaleLowerCase() === objectModelName.toLocaleLowerCase()
          ) {
            return item;
          }
        });
        break;
      }
      case 'fd-dev-inheritance': {
        let parentId = currentRepObj.get('parent.id');
        let childId = currentRepObj.get('child.id');
        objectModelName = objectModel.get('description');
        if (isSourse && !isNone(newConnectedClass)) {
          parentId = newConnectedClass.get('id');
        } else if (!isSourse && !isNone(newConnectedClass)) {
          childId = newConnectedClass.get('id');
        }

        newRepObj = modelsCurrentStage.find(function(item) {
          let name = item.get('name');
          if (
            item.get('parent.id') === parentId && item.get('child.id') === childId && item.get('id') !== repositoryObjectId &&
            !isNone(objectModelName) && !isNone(name) && name.toLocaleLowerCase() === objectModelName.toLocaleLowerCase()
          ) {
            return item;
          }
        });
        break;
      }
    }

    if (!isNone(newRepObj)) {
      this._decrementPropertyReferenceCount(currentRepObj);
      this._incrementPropertyReferenceCount(newRepObj);

      objectModel.set('repositoryObject', `{${newRepObj.get('id')}}`);

      if (modelName === 'fd-dev-aggregation' || modelName === 'fd-dev-association') {
        let startMultiplicity = newRepObj.get('startMultiplicity')
        view.model.setLabelText('startMultiplicity', startMultiplicity);
        this._updateInputValue('.start-multiplicity-input', startMultiplicity, view);

        let endMultiplicity = newRepObj.get('endMultiplicity')
        view.model.setLabelText('endMultiplicity', endMultiplicity);
        this._updateInputValue('.end-multiplicity-input', endMultiplicity, view);

      } else if (modelName === 'fd-dev-class') {

        let stereotype = newRepObj.get('stereotype') || '';
        objectModel.set('stereotype', stereotype);
        this._updateInputValue('.class-stereotype-input', stereotype, view);

        let attributes = newRepObj.get('attributesStr') || '';
        objectModel.set('attributes', attributes.split('\n'));
        this._updateInputValue('.attributes-input', attributes, view);

        let methods = newRepObj.get('methodsStr') || '';
        objectModel.set('methods', methods.split('\n'));
        this._updateInputValue('.methods-input', methods, view);

        view.updateRectangles();
      }

    } else if (currentRepObj.get('referenceCount') > 1) {
      this._decrementPropertyReferenceCount(currentRepObj);

      let newElement = store.createRecord(`${modelName}`, {
        id: uuid.v4(),
        stage: stage
      });

      this._incrementPropertyReferenceCount(newElement);
      objectModel.set('repositoryObject', `{${newElement.get('id')}}`);

      if (modelName === 'fd-dev-aggregation' || modelName === 'fd-dev-association') {
        let startRole = objectModel.get('startRoleTxt');
        let endRole = objectModel.get('endRoleTxt');
        let name = objectModel.get('description');
        newElement.set('endClass', currentRepObj.get('endClass'));
        newElement.set('startClass', currentRepObj.get('startClass'));
        newElement.set('endMultiplicity', '*');
        newElement.set('startMultiplicity', '1');
        newElement.set('name', name);
        newElement.set('startRoleStr', startRole);
        newElement.set('endRoleStr', endRole);

        view.model.setLabelText('startRoleTxt', startRole);
        this._updateInputValue('.start-role-input', startRole, view);

        view.model.setLabelText('endRoleTxt', endRole);
        this._updateInputValue('.end-role-input', endRole, view);

        view.model.setLabelText('description', name);
        this._updateInputValue('.description-input', name, view);

        view.model.setLabelText('startMultiplicity', '1');
        this._updateInputValue('.start-multiplicity-input', '1', view);

        view.model.setLabelText('endMultiplicity', '*');
        this._updateInputValue('.end-multiplicity-input', '*', view);

      } else if (modelName === 'fd-dev-class') {

        let objectModelName = objectModel.get('name')
        newElement.set('caption', objectModelName);
        newElement.set('description', objectModelName);
        newElement.set('name', objectModelName);
        newElement.set('nameStr', objectModelName);
        newElement.set('attributesStr', '');
        newElement.set('methodsStr', '');

        objectModel.set('stereotype', '');
        this._updateInputValue('.class-stereotype-input', '', view);

        objectModel.set('attributes', A(''));
        this._updateInputValue('.attributes-input', '', view);

        objectModel.set('methods', A(''));
        this._updateInputValue('.methods-input', '', view);

        view.updateRectangles();

      } else if (modelName === 'fd-dev-inheritance') {

        let name = objectModel.get('description');
        newElement.set('child', currentRepObj.get('child'));
        newElement.set('parent', currentRepObj.get('parent'));
        newElement.set('name', name);

        view.model.setLabelText('description', name);
        this._updateInputValue('.description-input', name, view);
      }

      if (!isNone(newConnectedClass)) {
        newElement.set(`${repProp}`, newConnectedClass);
      }
    } else {
      if (modelName === 'fd-dev-aggregation' || modelName === 'fd-dev-association') {
        currentRepObj.set('startRoleStr', objectModel.get('startRoleTxt'));
        currentRepObj.set('endRoleStr', objectModel.get('endRoleTxt'));
      }

      currentRepObj.set('name', objectModelName);
      if (!isNone(newConnectedClass)) {
        currentRepObj.set(`${repProp}`, newConnectedClass);
      }
    }
  },

  /**
    Update JointJS view inputs.

    @method _updateInputValue
    @param {String} path model diagrams object.
    @param {String} value new value in inputs.
    @param {Object} view this JoinJS object.
   */
  _updateInputValue(path, value, view) {
    let input = view.$box.find(`${path}`);
    if (input.val() !== value) {
      input.val(value);
      input.prop('rows', value.split(/[\n\r|\r|\n]/).length || 1);
    }
  },

  /**
    Get modelName by type.

    @method _getModelName
    @param {String} type json type objects.
   */
  _getModelName(type) {
    let modelName;
    switch (type) {
      case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
        modelName = 'fd-dev-class';
        break;
      case 'STORMCASE.UML.cad.Association, UMLCAD':
        modelName = 'fd-dev-association';
        break;
      case 'STORMCASE.UML.cad.Composition, UMLCAD':
        modelName = 'fd-dev-aggregation';
        break;
      case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
        modelName = 'fd-dev-inheritance';
        break;
    }

    return modelName;
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
      this.get('emptyReferenceCountItems').removeObject(item);
    }
  },

  /**
    Delete primitive and repositoryObject.

    @method _removeElements
    @param {Object} object remove object.
   */
  _removeElements(object) {
    let primitives = this.get('primitives');
    let removeObject = primitives.findBy('id', object.id);
    if (isNone(removeObject)) {
      return;
    }

    let repositoryObject = removeObject.get('repositoryObject');
    if (!isNone(repositoryObject)) {
      let store = this.get('store');
      let modelName = this._getModelName(removeObject.get('primitive.$type'));
      let allModels = store.peekAll(`${modelName}`);
      let currentRepObj = allModels.findBy('id', repositoryObject.slice(1, -1));
      if (!isNone(currentRepObj)) {
        this._decrementPropertyReferenceCount(currentRepObj);
      }
    }

    primitives.removeObject(removeObject);
  },

  /**
    find and update view joint object.

    @method _updateJointObjectView
    @param {String} id id joint object.
   */
  _updateJointObjectView(id) {
    let paper = this.get('paper');
    let model = paper.model.getCell(id);
    if (isNone(model)) {
      return;
    }

    let view = paper.findViewByModel(model);
    view.updateInputValue();
    view.updateRectangles();
  }
});
