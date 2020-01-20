/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { isNone, isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

import $ from 'jquery';
import joint from 'npm:jointjs';
import uuid from 'npm:node-uuid';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';
import {
  forPointerMethodOverrideResizeAndDnd,
  forLinkAndElementPointerClickEvent,
  forBlankEventPointerClickAndContextMenu
} from '../utils/fd-update-coordinate-for-firefox';

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
    Object with flags indicates whether diagram is readonly.

    @property readonly
    @type Boolean
  */
  readonly: false,

  readonlyObserver: observer('readonly', function() {
    let paper = this.get('paper');
    if (isNone(paper)) {
      return;
    }

    if (this.get('readonly')) {
      $(paper.el).find('input,textarea').addClass('click-disabled');
      paper.setInteractivity(false);
      paper.off('element:pointermove', this._ghostElementMove, this);
      paper.off('element:pointerup', this._ghostElementRemove, this);
    } else {
      $(paper.el).find('input,textarea').removeClass('click-disabled');
      paper.setInteractivity({ elementMove: false });
      paper.on('element:pointermove', this._ghostElementMove, this);
      paper.on('element:pointerup', this._ghostElementRemove, this);
      let highlightedElement = this.get('highlightedElement');
      if (highlightedElement) {
        highlightedElement.unhighlight();
        this.set('highlightedElement', null);
      }
    }
  }),

  /**
    Add handlers on pointer events.

    @method pointerEvents
  */
  pointerEvents: observer('currentTargetElementIsPointer', 'paper', function() {
    let currentTargetElementIsPointer = this.get('currentTargetElementIsPointer');
    let paper = this.get('paper');
    let graph = this.get('graph');
    if (isNone(paper) || isNone(graph)) {
      return;
    }

    if (currentTargetElementIsPointer) {
      paper.on('element:pointermove', this._ghostElementMove, this);
      paper.on('element:pointerup', this._ghostElementRemove, this);

      graph.getLinks().map(link => {
        link.findView(paper).$el.removeClass('edit-disabled');
        link.findView(paper).$el.removeClass('linktools-disabled');
      }, this);

      $(paper.el).find('input,textarea').removeClass('click-disabled');
    } else {
      paper.off('element:pointermove', this._ghostElementMove, this);
      paper.off('element:pointerup', this._ghostElementRemove, this);

      switch (this.paper.fDDEditMode) {
        case 'addNoteConnector':
          this._enableWrapLinks();
          break;
        case 'addInheritance':
          this._enableWrapBaseLinks();
          break;
        default:
          this._disableEditLinks();
      }

      $(paper.el).find('input,textarea').addClass('click-disabled');
    }
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method didInsertElement
  */
  didInsertElement() {
    this._super(...arguments);

    const namespace = joint.shapes;
    let graph = this.set('graph', new joint.dia.Graph({}, { cellNamespace: namespace , cellViewNamespace: namespace}));
    let paper = this.set('paper', new joint.dia.Paper({
      el: this.get('element'),
      model: graph,
      connectionStrategy: joint.connectionStrategies.toPointConnection,
      defaultConnectionPoint: joint.connectionPoints.toPointConnection,
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
      cellNamespace: namespace,
      cellViewNamespace: namespace
    }));

    paper.on('blank:pointerclick', this._blankPointerClick, this);
    paper.on('element:pointerclick', this._elementPointerClick, this);
    paper.on('link:pointerclick', this._linkPointerClick, this);
    paper.on('blank:contextmenu', this._blankContextMenu, this);

    paper.on('updaterepobj', this._updateRepObj, this);
    paper.on('getrepobjvalues', this._getRepObjValues, this);
    paper.on('checkexistelements', this._checkOnExistElements, this);
    paper.on('cell:highlight', this._highlighted, this);
    paper.on('element:openeditform', this._elementOpenEditForm, this);

    let elements = this.get('elements');
    let links = this.get('links');
    graph.addCells(elements.map(e => {
      let element = e.JointJS();
      return element;
    }));

    graph.addCells(links.map(function(l) {
      let link = l.JointJS();
      switch (link.prop('type')) {
        case 'flexberry.uml.Aggregation':
        case 'flexberry.uml.Association':
        case 'flexberry.uml.Generalization':
          if ('anchor' in link.attributes.source) {
            link.attr('.marker-source', {'display':'none'});
          }

          if ('anchor' in link.attributes.target) {
            link.attr('.marker-target', {'display':'none'});
          }
      }
      return link;
    }
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

    this.get('fdDiagramService').on('updateJointObjectViewTriggered', this, this._updateJointObjectView);
    this.get('readonlyObserver').apply(this);
  },

  willDestroy() {
    this._super(...arguments);

    this.get('fdDiagramService').off('updateJointObjectViewTriggered', this, this._updateJointObjectView);
  },

  /**
    Handler event 'blank:pointerclick'.

    @method actions._blankPointerClick
    @param {jQuery.Event} e event.
   */
  _blankPointerClick(e) {
    let coordinates = forBlankEventPointerClickAndContextMenu(e);
    let options = { e: e, x: coordinates.x, y: coordinates.y };
    let highlightedElement = this.get('highlightedElement');
    if (highlightedElement) {
      highlightedElement.unhighlight();
      this.set('highlightedElement', null);
    }

    let newElement = this.get('blankPointerClick')(options);
    this._addNewElement(newElement);
  },

  /**
  Handler event 'link:pointerclick'.

  @method actions._linkPointerClick
  @param {Object} link selected joint js link.
  @param {jQuery.Event} e event.
  @param {Number} x coordinate x.
  @param {Number} y coordinate y.
  **/
  _linkPointerClick(element, e, x, y) {
    let coordinates = forLinkAndElementPointerClickEvent(e, x, y);
    x = coordinates.x;
    y = coordinates.y;
    let options = { element: element, e: e, x: x, y: y };
    let placePoint = element.path.closestPointT({x:x,y:y});
    options.segmNo = placePoint.segmentIndex - 1;
    options.percent = placePoint.value;
    if (isNone(this.get('draggedLink'))) {
      let editMode = this.paper.fDDEditMode;
      switch (editMode) {
        case 'addInheritance':
        case 'addNoteConnector':
        {
          if (editMode === 'addNoteConnector' && !this._haveNote()) {
            return;
          }
          let startDragLink = this.get('startDragLink');
          let newLink = startDragLink(options);
          if (editMode === 'addInheritance') {
            newLink.attr('.marker-source', {'display':'none'});
          }
          this.set('draggedLink', newLink);
          let graph = this.get('graph');
          let paper = this.get('paper');
          let linkView = newLink
            .set({ 'target': { x: x, y: y } })
            .addTo(graph).findView(paper);
          this.set('isLinkAdding', true);
          let links = graph.getLinks();
          for (let i = 0; i < links.length; i+=1) {
            let  link = links[i];
            let view = link.findView(paper);
              view.$el.addClass('edit-disabled');
          }
          $(document).on({
            'mousemove.link': this._onDrag.bind(this)
          }, {
            paper: paper,
            element: newLink
          });
          this.set('draggedLinkView', linkView);
          break;
        }
        default:
          if (isNone(this.get('draggedLink'))) {
            return;
          }
      }
    } else {
      if (this.get('endDragLink')(options)) {
        this._clearLinksData();
      }
    }
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
    let coordinates = forLinkAndElementPointerClickEvent(e, x, y);
    x = coordinates.x;
    y = coordinates.y;
    let options = { element: element, e: e, x: x, y: y };
    if (isNone(this.get('draggedLink'))) {
      let editMode = this.paper.fDDEditMode;
      if (editMode === 'addNoteConnector' && !this._haveNote()) {
        return;
      }

      let startDragLink = this.get('startDragLink');
      let newElement = startDragLink(options);
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
        let links = graph.getLinks();
        for (let i = 0; i < links.length; i+=1) {
          let  link = links[i];
          let view = link.findView(paper);
          if (link.cid == newElement.cid) {
            view.$el.addClass('edit-disabled');
          } else {
            view.$el.addClass('linktools-disabled');
            view.options.interactive.vertexAdd = false;
          }
        }

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
    Handler event '_onDrag'.

    @method actions._onDrag
    @param {jQuery.Event} e event.
  */
  _onDrag(evt) {
    evt.data.paper.snapToGrid({
      x: evt.clientX,
      y: evt.clientY
    });

    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, evt.offsetX, evt.offsetY);
    evt.data.element.set({
      'target': { x: coordinates.x, y: coordinates.y },
    });
  },

  /**
    Handler event 'blank:contextmenu'.

    @method actions._blankContextMenu
    @param {jQuery.Event} e event.
  */
  _blankContextMenu(e) {
    let coordinates = forBlankEventPointerClickAndContextMenu(e);
    let options = { e: e, x: coordinates.x, y: coordinates.y };
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
    $(document).off('mousemove.link');
    let graph = this.get('graph');
    let paper = this.get('paper');
    paper.fDDEditMode = 'pointerClick';
    graph.getLinks().map(link => {
      let view = link.findView(paper);
      view.$el.removeClass('edit-disabled');
      if ('vertexAdd' in view.options.interactive) {
        delete view.options.interactive.vertexAdd;
      }
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
      const shift = data.shift;
      if (data.widthResize || data.heightResize) {
        const oldSize = data.ghost.size();
        const position = data.ghost.position();
        let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
        data.ghost.resize(data.widthResize ? Math.max(coordinates.x - position.x, view.model.attributes.inputWidth || 0, view.model.attributes.minWidth || 0) : oldSize.width, data.heightResize ? Math.max(coordinates.y - position.y, view.model.attributes.inputHeight || 0, view.model.attributes.minHeight || 0) : oldSize.height);
      } else {
        data.ghost.position(x + shift.x, y + shift.y);
      }
    } else {
      let bbox = view.model.getBBox();
      let rects = view.model.getRectangles();
      if (rects.length > 0) {
        let paramsWidth = rects[0].element.attr('.flexberry-uml-params-rect/width');
        if (paramsWidth !== undefined) {
          bbox.width += paramsWidth - 10;
        }
      }
      let ghost = new joint.shapes.basic.Rect();

      ghost.attr({ rect: { 'fill': 'transparent', 'stroke': '#5755a1', 'stroke-dasharray': '4,4', 'stroke-width': 2 }});
      ghost.size({height: bbox.height, width: bbox.width});
      ghost.position(bbox.x, bbox.y);

      view.model.graph.addCell(ghost);
      evt.data.ghost = ghost;
      const button = $(evt.target.parentElement);
      evt.data.widthResize = button.hasClass('right-down-size-button') || button.hasClass('right-size-button');
      evt.data.heightResize = button.hasClass('right-down-size-button') || button.hasClass('down-size-button');
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
      if (data.widthResize || data.heightResize) {
        let newSize = data.ghost.size();
        view.updateRectangles(newSize.width, newSize.height);
      } else {
        let shift = evt.data.shift;
        let valueX = x + shift.x < 0 ? 0 : x + shift.x;
        let valueY = y + shift.y < 0 ? 0 : y + shift.y;
        view.model.position(valueX, valueY);
      }

      data.ghost.remove();

      let paper = view.paper;
      let links = paper.model.getConnectedLinks(view.model);
      links.forEach((link)=> {
        let linkView = paper.findViewByModel(link);
        linkView.updateBox();
        linkView.update();
      });

      view.highlight();
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
    Update objectModel by repositoryObject.

    @method _updateRepObj
    @param {Object} objectModel model diagrams object.
    @param {Object} view this JoinJS object.
   */
  _getRepObjValues(objectModel, view) {
    const repositoryObject = objectModel.get('repositoryObject');
    if (isNone(repositoryObject)) {
      return;
    }

    const modelName = this._getModelName(objectModel.get('primitive.$type'));
    if (modelName === 'fd-dev-class') {
      const store = this.get('store');
      const repositoryObjectId = repositoryObject.slice(1, -1);
      const currentRepObj = store.peekRecord(modelName, repositoryObjectId);

      const name = currentRepObj.get('nameStr') || '';
      objectModel.set('name', name);
      this._updateInputValue('.class-name-input', name, view);

      const stereotype = currentRepObj.get('stereotype') || '';
      const normalizeStereotype = view.normalizeStereotype(stereotype);
      objectModel.set('stereotype', normalizeStereotype);
      this._updateInputValue('.class-stereotype-input', normalizeStereotype, view);

      const attributes = currentRepObj.get('attributesStr') || '';
      objectModel.set('attributes', attributes.split('\n'));
      this._updateInputValue('.attributes-input', attributes, view);

      const methods = currentRepObj.get('methodsStr') || '';
      objectModel.set('methods', methods.split('\n'));
      this._updateInputValue('.methods-input', methods, view);

      const initSize = view.model.size();
      view.updateRectangles(initSize.width, initSize.height);
      view.update();
    }
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
    let isEmpty = false;
    if (isNone(repositoryObject)) {
      if (objectModel.get('primitive.$type') === 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin') {
        isEmpty = true;
      } else {
        return;
      }
    }

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    let modelName = this._getModelName(objectModel.get('primitive.$type'));
    let allModels = store.peekAll(`${modelName}`);

    let repositoryObjectId = !isEmpty ? repositoryObject.slice(1, -1) : null;
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
            name.trim().toLocaleLowerCase() === objectModelName.trim().toLocaleLowerCase() &&
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
          let name = isNone(item.get('name')) ? '' : item.get('name');
          let startRole = item.get('startRoleStr');
          let endRole = item.get('endRoleStr');
          if (
            item.get('startClass.id') === sClass && item.get('endClass.id') === eClass && item.get('id') !== repositoryObjectId &&
            !isNone(sRole) && !isNone(startRole) && startRole.trim().toLocaleLowerCase() === sRole.trim().toLocaleLowerCase() &&
            !isNone(eRole) && !isNone(endRole) && endRole.trim().toLocaleLowerCase() === eRole.trim().toLocaleLowerCase() &&
            !isNone(objectModelName) && !isNone(name) && name.trim().toLocaleLowerCase() === objectModelName.trim().toLocaleLowerCase()
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
          let name = isNone(item.get('name')) ? '' : item.get('name');
          if (
            item.get('parent.id') === parentId && item.get('child.id') === childId && item.get('id') !== repositoryObjectId &&
            !isNone(objectModelName) && !isNone(name) && name.trim().toLocaleLowerCase() === objectModelName.trim().toLocaleLowerCase()
          ) {
            return item;
          }
        });
        break;
      }
    }

    if (!isNone(newRepObj)) {
      if (!isEmpty) {
        this._decrementPropertyReferenceCount(currentRepObj);
      }

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

    } else if (isEmpty || currentRepObj.get('referenceCount') > 1) {
      if (!isEmpty) {
        this._decrementPropertyReferenceCount(currentRepObj);
      }

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

    if (isEmpty) {
      let emptyLinks = this.graph.getConnectedLinks(view.model);
      emptyLinks.forEach((link) => {
        this._updateEmptylink(link);
      });
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
  },

  /**
    Create rep object for empty link.

    @method _updateEmptylink
    @param {Object} link current link.
   */
  _updateEmptylink(link) {
    let objectModel = link.get('objectModel');
    let type = objectModel.get('primitive.$type');
    if (type !== 'STORMCASE.UML.cad.Association, UMLCAD' && type !== 'STORMCASE.UML.cad.Inheritance, UMLCAD' && type !== 'STORMCASE.UML.cad.Composition, UMLCAD') {
      return;
    }

    let endPrimitiveId = objectModel.get('target.id');
    let startPrimitiveId = objectModel.get('source.id');

    let endPrimitive = this.graph.getCell(endPrimitiveId);
    let startPrimitive = this.graph.getCell(startPrimitiveId);

    let endPrimitiveRepObjId = endPrimitive.get('objectModel').repositoryObject;
    let startPrimitiveRepObjId = startPrimitive.get('objectModel').repositoryObject;

    if (isBlank(endPrimitiveRepObjId) || isBlank(startPrimitiveRepObjId)) {
      return;
    }

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));
    let endPrimitiveRepObj = classesCurrentStage.findBy('id', endPrimitiveRepObjId.slice(1, -1));
    let startPrimitiveRepObj = classesCurrentStage.findBy('id', startPrimitiveRepObjId.slice(1, -1));

    let modelName = this._getModelName(type);
    let allModels = store.peekAll(`${modelName}`);
    let modelsCurrentStage = allModels.filterBy('stage.id', stage.get('id'));

    let newElement;
    if (modelName === 'fd-dev-inheritance') {
      let objectModelName = objectModel.get('description');

      newElement = modelsCurrentStage.find(function(item) {
        let name = isNone(item.get('name')) ? '' : item.get('name');
        if (
          item.get('parent.id') === startPrimitiveRepObj.get('id') && item.get('child.id') === endPrimitiveRepObj.get('id') &&
          !isNone(objectModelName) && !isNone(name) && name.trim().toLocaleLowerCase() === objectModelName.trim().toLocaleLowerCase()
        ) {
          return item;
        }
      });
    } else {
      let sRole = objectModel.getWithDefault('startRoleTxt', '').trim();
      sRole = !isBlank(sRole) && sRole[0] !== '+' ? '+' + sRole : sRole;
      let eRole = objectModel.getWithDefault('endRoleTxt', '').trim();
      eRole = !isBlank(eRole) && eRole[0] !== '+' ? '+' + eRole : eRole;
      let objectModelName = objectModel.get('description');

      newElement = modelsCurrentStage.find(function(item) {
        let name = isNone(item.get('name')) ? '' : item.get('name');
        let startRole = item.get('startRoleStr');
        let endRole = item.get('endRoleStr');
        if (
          item.get('startClass.id') === startPrimitiveRepObj.get('id') && item.get('endClass.id') === endPrimitiveRepObj.get('id') &&
          !isNone(sRole) && !isNone(startRole) && startRole.trim().toLocaleLowerCase() === sRole.trim().toLocaleLowerCase() &&
          !isNone(eRole) && !isNone(endRole) && endRole.trim().toLocaleLowerCase() === eRole.trim().toLocaleLowerCase() &&
          !isNone(objectModelName) && !isNone(name) && name.trim().toLocaleLowerCase() === objectModelName.trim().toLocaleLowerCase()
        ) {
          return item;
        }
      });
    }

    if (isNone(newElement)) {
      newElement = store.createRecord(`${modelName}`, {
        id: uuid.v4(),
        stage: stage
      });

      if (modelName === 'fd-dev-inheritance') {
        newElement.set('child', endPrimitiveRepObj);
        newElement.set('parent', startPrimitiveRepObj);
      } else {
        newElement.set('endClass', endPrimitiveRepObj);
        newElement.set('startClass', startPrimitiveRepObj);
        newElement.set('endMultiplicity', objectModel.get('endMultiplicity'));
        newElement.set('startMultiplicity', objectModel.get('startMultiplicity'));
        newElement.set('startRoleStr', objectModel.get('startRoleTxt'));
        newElement.set('endRoleStr', objectModel.get('endRoleTxt'));
      }

      newElement.set('name', objectModel.get('description'));
    } else if (modelName !== 'fd-dev-inheritance') {
      let view = this.paper.findViewByModel(link);
      let startMultiplicity = newElement.get('startMultiplicity')
      view.model.setLabelText('startMultiplicity', startMultiplicity);
      this._updateInputValue('.start-multiplicity-input', startMultiplicity, view);

      let endMultiplicity = newElement.get('endMultiplicity')
      view.model.setLabelText('endMultiplicity', endMultiplicity);
      this._updateInputValue('.end-multiplicity-input', endMultiplicity, view);
    }

    objectModel.set('repositoryObject', `{${newElement.get('id')}}`);
    this._incrementPropertyReferenceCount(newElement);
  },

  _enableEditLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      view.$el.removeClass('edit-disabled');
      view.$el.removeClass('linktools-disabled');
      if ('vertexAdd' in view.options.interactive) {
        delete view.options.interactive.vertexAdd;
      }
    }
  },

  _enableWrapBaseLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      if (link.get('type') == 'flexberry.uml.Generalization' && !link.connectedToLine()) {
        view.$el.removeClass('edit-disabled');
        view.$el.addClass('linktools-disabled');
        view.options.interactive.vertexAdd = false;
      } else {
        view.$el.addClass('edit-disabled');
      }
    }
  },

  _enableWrapLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      view.$el.removeClass('edit-disabled');
      view.$el.addClass('linktools-disabled');
      view.options.interactive.vertexAdd = false;
    }
  },

  _disableEditLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      view.$el.addClass('edit-disabled');
    }
  },

  _haveNote: function() {
    let paper = this.paper;
    let elements = paper.model.getElements();
    for (let i = 0; i < elements.length; i+=1) {
      let  element = elements[i];
      if (element.get('type') == 'flexberry.uml.Note') {
        return true;
      }

    }
    return false;
  }

});
