import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A, isArray } from '@ember/array';
import { computed, get } from '@ember/object';
import { isNone, isBlank, isEmpty } from '@ember/utils';
import { next } from '@ember/runloop';
import $ from 'jquery';
import fade from 'ember-animated/transitions/fade';
import layout from '../templates/components/fd-uml-diagram-editor';
import FdAcrionsForCadPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cad-primitives';
import FdAcrionsForDpdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-dpd-primitives';
import FdAcrionsForStdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-std-primitives';
import FdAcrionsForCodPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cod-primitives';
import FdActionsForActivityPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-activity-primitives';
import FdAcrionsForSdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-sd-primitives';
import FdAcrionsForCommonPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-common-primitives';
import FdActionsForUcdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-ucd-primitives';
import FdPopupActions from '../mixins/fd-popup-actions';

export default Component.extend(
FdAcrionsForCadPrimitivesMixin,
FdAcrionsForDpdPrimitivesMixin,
FdAcrionsForStdPrimitivesMixin,
FdAcrionsForCodPrimitivesMixin,
FdActionsForActivityPrimitivesMixin,
FdAcrionsForSdPrimitivesMixin,
FdAcrionsForCommonPrimitivesMixin,
FdActionsForUcdPrimitivesMixin,
FdPopupActions, {

  layout,

  store: service(),

  transition: fade,

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Flag indicates when edit panel toolbar is collapsed.

    @property _collapseEditPanelToolbar
    @type Boolean
    @default false
    @private
  */
  _collapseEditPanelToolbar: false,

  /**
    Array elements to interact.

    @property interactionElements
    @type Array
  */
  interactionElements: A(),

  /**
    Some primitives, like a swimline, can place only in other primitives. This array contains types of available parent elements

    @property parentElements
    @type Array
  */
  parentElements: A(),

  /**
   Array items with empty reference count.

   @property emptyReferenceCountItems
   @type {Array}
   */
  emptyReferenceCountItems: A(),

  /**
    Function for create element.

    @property jointjsCallback
    @type Function
  */
  jointjsCallback: undefined,

  /**
    Function for create element in store.

    @property storeCallback
    @type Function
  */
  storeCallback: undefined,

  /**
    Type create object.

    @property type
    @type String
  */
  type: undefined,

  /**
    New created link.

    @property newLink
    @type Object
  */
  newLink: undefined,

  /**
    True when link adding in process.

    @property isLinkAdding
    @type Boolean
  */
  isLinkAdding: false,

  /**
    Сurrent pressed button.

    @property currentTargetElement
    @type jQuery
  */
  currentTargetElement: undefined,

  /**
    Сurrent pressed button is pointer.

    @property currentTargetElementIsPointer
    @type Bool
  */
  currentTargetElementIsPointer: computed('currentTargetElement', function() {
    let currentTargetElement = this.get('currentTargetElement');
    if (!isNone(currentTargetElement)) {
      return currentTargetElement.hasClass('pointer-button');
    }

    return true;
  }),

  /**
    Flag indicates when on primitive panel choosen child type object.

    @property isCreatedObjectChild
    @type Bool
  */
  isCreatedObjectChild: computed('type', 'parentElements', function() {
    let isObject = (this.get('type') === 'Object');
    let parentElements = this.get('parentElements');
    let isHasParents = !isEmpty(parentElements) && !isNone(parentElements) && isArray(parentElements);

    return isObject && isHasParents;
  }),

  /**
    Сurrent diagram's paper.

    @property paper
    @type joint.dia.Paper
  */
  paper: undefined,

  classNames: ['fd-uml-diagram-editor'],

  attributeBindings: ['spellcheck'],

  popupNamespace: 'diagrams-popup',

  /**
    Disable spellcheck for diagram elements.

    @property spellcheck
    @type Boolean
  */
  spellcheck: false,

  /**
   Type source element of Link
   */
  sourceElementType: undefined,

  /**
    Object with flags indicates whether edit panel is readonly.

    @property readonlyMode
    @type Boolean
  */
  readonlyMode: false,

  /**
    Object with flags indicates whether diagram is readonly.

    @property readonly
    @type Boolean
  */
  readonly: computed('readonlyMode', function() {
    return this.get('readonlyMode') && !this.get('model.isNew');
  }),

  diagramType: computed('model.constructor.modelName', function() {
    let type = this.get('model.constructor.modelName');
    if (isNone(type)) {
      return undefined;
    }

    return type.split('-').pop();
  }),

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('diagramResizeTriggered', this, this._fitToContent);

    next(() => {
      this.get('fdSheetService').toolbarDiagramPosition();
    });
  },

  /**
   Called when the element of the view is going to be destroyed.
   For more information see [willDestroyElement](http://emberjs.com/api/classes/Ember.Component.html#event_willDestroyElement) event of [Ember.Component](http://emberjs.com/api/classes/Ember.Component.html).
 */
 willDestroyElement() {
   this._super(...arguments);

   this.get('fdSheetService').off('diagramResizeTriggered', this, this._fitToContent);
 },

  actions: {
    /**
      Normalize paper's size

      @method actions.fitToContent
    */
    fitToContent() {
      let paper = this.get('paper');
      if (isNone(paper) || !this.$()) {
        return;
      }

      let minWidth = this.$().width();
      let minHeight = this.$().height();
      paper.fitToContent({ minWidth, minHeight, padding: 10 });
    },

    /**
      Open popup on page.

      @method actions.openPopupForDiagramElements
      @param {Object} target popup target.
      @param {Object} model popup value.
    */
    openPopupForDiagramElements(target, model) {
      this.openPopup(target, model);
    },

    /**
      Handler event blankPointerClick

      @method blankPointerClick
      @param {Object} options options event 'blank:pointerclick'.
    */
    blankPointerClick(options) {
      let type = this.get('type');
      if (!isNone(type)) {
        let x = options.x;
        let y = options.y;

        switch (type) {
          case 'Object': {
            // Check if now select not child object. If is not, then create object primitive on blank.
            if (!this.get('isCreatedObjectChild')) {
              let jointjsCallback = this.get('jointjsCallback');
              let newObject = jointjsCallback(x, y);
              this.clearData();

              return newObject;
            }

            break;
          }
          case 'Link': {
            let newLink = this.get('newLink');
            if (newLink && !isNone(newLink.getSourceElement())) {
              newLink.insertVertex(-1, { x: x, y: y });
            }

            break;
          }
        }
      }
    },

    /**
      Handler event startDragLink

      @method startDragLink
      @param {Object} options options event 'element:pointerclick'.
    */
    startDragLink(options) {
      let type = this.get('type');
      if (type === 'Link') {
        let element = options.element;
        let model = element.model.attributes;
        let type = model.type;
        let interactionElements = this.get('interactionElements');

        if ((isNone(interactionElements) || (isArray(interactionElements) && interactionElements.includes(type)) ||
         (isArray(interactionElements.start) && interactionElements.start.includes(type)))) {
          this.sourceElementType =  type;
          let jointjsCallback = this.get('jointjsCallback');
          let linkProperties = { source: model.id };
          if ('segmNo' in options && options['segmNo'] >= 0) {
            linkProperties.segmNo = options.segmNo;
            linkProperties.percent = options.percent;
          }
          let newLink = jointjsCallback(linkProperties);
          newLink.set({ 'startClassRepObj': { id: get(model, 'objectModel.repositoryObject') } });
          let objectModel = newLink.get('objectModel');
          if (!isNone(objectModel)) {
            objectModel.set('startPoint', {x: options.x, y: options.y });
          }

          this.set('newLink', newLink);
          return newLink;
        }
      }
    },

    /**
      Handler event endDragLink

      @method endDragLink
      @param {Object} options options event 'element:pointerclick'.
    */
    endDragLink(options) {
      let type = this.get('type');
      if (type === 'Link') {
        let element = options.element;
        let model = element.model;
        let attributes = model.attributes;
        let type = attributes.type;
        let interactionElements = this.get('interactionElements');
        let newLink = this.get('newLink');

        if ((isNone(interactionElements) || (isArray(interactionElements) && interactionElements.includes(type)) ||
         (isArray(interactionElements.end) && interactionElements.end.includes(type)))
        ) {
          if (newLink.get('type') == 'flexberry.uml.NoteConnector' && this.sourceElementType !== 'flexberry.uml.Note' &&  type !== 'flexberry.uml.Note') {
            return false;
          }

          let target = { id: attributes.id};
          if (model.isLink()) {
            let segmNo = model.isLink() ? options.segmNo : -1;
            let percent = model.isLink() ? options.percent : 0;
            let anchor = {
              name: 'connectionSegmRatio',
              args: {
                segmNo: segmNo,
                percent: percent
              }
            };
            target.segmNo = segmNo;
            target.percent = percent;
            target.anchor = anchor;
          }

          newLink.set({ 'target': target, 'endClassRepObj': { id: get(attributes, 'objectModel.repositoryObject') } });
          let storeCallback = this.get('storeCallback');
          if (storeCallback) {
            let linkRecord = storeCallback({ startClassRepObj: newLink.get('startClassRepObj'), endClassRepObj: newLink.get('endClassRepObj') });
            newLink.set({ 'repositoryObject': linkRecord });
            this.paper.trigger('checkexistelements:addstep', newLink, this.paper.findViewByModel(newLink));
          }

          this.clearData();
          return true;
        }
      }

      return false;
    },

    /**
      Handler event blankContextMenu

      @method blankContextMenu
      @param {Object} options options event 'blank:contextmenu'.
    */
    blankContextMenu() {
      let type = this.get('type');
      if (type === 'Link') {
        let newLink = this.get('newLink');
        if (isNone(newLink)) {
          this.clearData();
        } else if (newLink.vertices().length === 0) {
          let primitives = this.get('model.primitives');
          let linkPrimitive = primitives.findBy('id', newLink.get('id'));
          primitives.removeObject(linkPrimitive);
          this.clearData();
          return true;
        } else {
          newLink.removeVertex(-1);
        }
      } else if (type === 'Object') {
        this.clearData();
      }

      return false;
    },

    /**
      Handler for click on pointerClick button.

      @method actions.pointerClick
     */
    pointerClick() {
      if (!this.get('isLinkAdding')) {
        this.clearData();
      }
    },

    /**
      Handler for click on toolbar buttons.

      @method actions.toolbarButtonClicked
      @param {String} buttonName clicked button name.
     */
    toolbarButtonClicked(buttonName, e) {
      if (!isBlank(buttonName)) {
        this.paper.fDDEditMode = buttonName;
        switch (buttonName) {
          case 'pointerClick':
          case 'addNoteConnector':
            this.enableEditLinks();
            break;
          case 'addInheritance':
            this.enableWrapBaseLinks();
            break;
          default:
            this.disableEditLinks();
        }
        this.send(buttonName, e);
      }
    },

    /**
      Handler for click on toolbar collapse edit panel button.

      @method actions.collapseEditPanelToolbar
     */
    collapseEditPanelToolbar() {
      this.toggleProperty('_collapseEditPanelToolbar');
    },

    /**
    Handler event createChildObject.

    @method createChildObject
    @param {Object} options selected joint js element.
    */
    createChildObject(options) {
      let element = options.element;
      let model = element.model.attributes;
      let type = model.type;
      let parentElements = this.get('parentElements');

      if (parentElements.includes(type)) {
        let x = options.x;
        let y = options.y;
        let parentElement = options.element.model.id;
        let jointjsCallback = this.get('jointjsCallback');
        let newObject = jointjsCallback(x, y, parentElement);
        this.clearData();
        return newObject;
      }
    }
  },

  /**
    Fills properties for create object.

    @method createObjectData
    @param {function} jointjsCallback function of creating a new object.
    @param {jQuery.Event} e event.
    @param {Array} parentElements array of possible parent objects if created object is child object.
  */
  createObjectData(jointjsCallback, e, parentElements) {
    if (!this.get('isLinkAdding')) {
      this._clearProperties();
      this.set('jointjsCallback', jointjsCallback);
      this.set('type', 'Object');
      this.set('parentElements', parentElements);
      this._changeCurrentTargetElement(e);
    }
  },

  /**
    Fills properties for create link.

    @method createLinkData
    @param {function} jointjsCallback function of creating a new link.
    @param {jQuery.Event} e event.
    @param {Array} interactionElements array of object types with which the current link can interact.
    @param {function} storeCallback function for creating a new link in store.
  */
  createLinkData(jointjsCallback, e, interactionElements, storeCallback) {
    if (!this.get('isLinkAdding')) {
      this._clearProperties();
      this.set('jointjsCallback', jointjsCallback);
      this.set('storeCallback', storeCallback);
      this.set('type', 'Link');
      this.set('interactionElements', interactionElements);
      this._changeCurrentTargetElement(e);
    }
  },

  /**
    Resets data for create elements.

    @method clearData
  */
  clearData() {
    this._clearProperties();
    this._resetCurrentTargetElement();
    this.enableEditLinks();
    this.paper.fDDEditMode = 'pointerClick';
  },

  /**
    Clear all properties for create elements.

    @method _clearProperties
    @private
  */
  _clearProperties() {
    this.set('jointjsCallback', undefined);
    this.set('storeCallback', undefined);
    this.set('type', undefined);
    this.set('interactionElements', A());
    this.set('parentElements', A());
    this.set('newLink', undefined);
  },

  enableEditLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      view.$el.removeClass('edit-disabled');
    }
  },

  enableWrapBaseLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      if (link.get('type') == 'flexberry.uml.Generalization' && !link.connectedToLine()) {
        view.$el.removeClass('edit-disabled');
      } else {
        view.$el.addClass('edit-disabled');
      }
    }
  },

  disableEditLinks: function() {
    let paper = this.paper;
    let links = paper.model.getLinks();
    for (let i = 0; i < links.length; i+=1) {
      let  link = links[i];
      let view = link.findView(paper);
      view.$el.addClass('edit-disabled');
    }
  },

  /**
    Change 'CurrentTargetElement'.

    @method _changeCurrentTargetElement
    @param {jQuery.Event} e event.
    @private
  */
  _changeCurrentTargetElement(e) {
    let currentTargetElement = this.get('currentTargetElement') || this.$('.pointer-button');
    currentTargetElement.removeClass('active');
    let newCurrentTargetElement = $(e.currentTarget);
    newCurrentTargetElement.addClass('active');
    this.set('currentTargetElement', newCurrentTargetElement);
  },

  /**
    Reset 'CurrentTargetElement'.

    @method _resetCurrentTargetElement
    @private
  */
  _resetCurrentTargetElement() {
    let currentTargetElement = this.get('currentTargetElement') || this.$('.pointer-button');
    currentTargetElement.removeClass('active');
    let pointer = this.$('.pointer-button');
    pointer.addClass('active');
    this.set('currentTargetElement', pointer);
  },

  /**
    Resize diagram.

    @method _fitToContent
    @private
  */
  _fitToContent(sheetName, containsName) {
    let sheetComponentName = this.get('sheetComponentName');
    if (containsName ? sheetName.includes(sheetComponentName) : sheetComponentName === sheetName) {
      this.get('actions.fitToContent').bind(this)();
    }
  },

  /**
    Find 'repositoryObject' by id.

    @method getRepObj
    @param {DS.Store} store current store.
    @param {Object} stage current stage.
    @param {Object|String} value repository object.
    @param {String} modelObject modelObject.
  */
  getRepObj(store, stage, value, modelObject) {
    let typeValue = typeof value;
    if (typeValue === 'object' && !isNone(value)) {
      return value;
    } else if (typeValue === 'string') {
      let objectId = value.substr(1, value.length - 2);
      let allObjects = store.peekAll(`${modelObject}`);
      let objectsCurrentStage = allObjects.filterBy('stage.id', stage.get('id'));
      let repObj = objectsCurrentStage.findBy('id', objectId);
      return repObj;
    } else {
      return null;
    }
  },
});
