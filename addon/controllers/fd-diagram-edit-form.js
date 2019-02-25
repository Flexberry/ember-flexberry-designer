import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import FdAcrionsForCadPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cad-primitives';
import FdAcrionsForDpdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-dpd-primitives';
import FdAcrionsForStdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-std-primitives';
import FdAcrionsForCodPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cod-primitives';
import FdActionsForActivityPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-activity-primitives';
import FdAcrionsForSdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-sd-primitives';
import FdAcrionsForCommonPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-common-primitives';
import FdActionsForUCDPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-ucd-primitives';

export default EditFormController.extend(
FdWorkPanelToggler,
FdFormUnsavedData,
FdAcrionsForCadPrimitivesMixin,
FdAcrionsForDpdPrimitivesMixin,
FdAcrionsForStdPrimitivesMixin,
FdAcrionsForCodPrimitivesMixin,
FdActionsForActivityPrimitivesMixin,
FdAcrionsForSdPrimitivesMixin,
FdAcrionsForCommonPrimitivesMixin,
FdActionsForUCDPrimitivesMixin, {
  parentRoute: 'fd-diagram-list-form',

  /**
    Array elements to interact.

    @property interactionElements
    @type Array
  */
  interactionElements: Ember.A(),

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
    Stores classes that are created, but not yet saved, in the diagram.

    @property createdClasses
    @type Ember.Array
  */
  createdClasses: Ember.A(),

  actions: {

    /**
      Handler event blankPointerClick

      @method blankPointerClick
      @param {Object} options options event 'blank:pointerclick'.
    */
    blankPointerClick(options) {
      let type = this.get('type');
      if (!Ember.isNone(type)) {
        let x = options.x;
        let y = options.y;
        if (type === 'Object') {
          let jointjsCallback = this.get('jointjsCallback');
          let newObject = jointjsCallback(x, y);
          this.clearData();

          return newObject;
        } else {
          let newLink = this.get('newLink');
          if (type === 'Link' && newLink && !Ember.isNone(newLink.getSourceElement())) {
            newLink.insertVertex(-1, { x: x, y: y });
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

        if ((Ember.isNone(interactionElements) || (Ember.isArray(interactionElements) && interactionElements.includes(type)) ||
         (Ember.isArray(interactionElements.start) && interactionElements.start.includes(type)))) {
          let jointjsCallback = this.get('jointjsCallback');
          let newLink = jointjsCallback({ source: model.id, startClassRepObj: model.repositoryObject });
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
        let model = element.model.attributes;
        let type = model.type;
        let interactionElements = this.get('interactionElements');

        if ((Ember.isNone(interactionElements) || (Ember.isArray(interactionElements) && interactionElements.includes(type)) ||
         (Ember.isArray(interactionElements.start) && interactionElements.start.includes(type)))) {
          let newLink = this.get('newLink');
          newLink.set({ 'target': { id: model.id }, 'endClassRepObj': { id: model.repositoryObject } });
          let storeCallback = this.get('storeCallback');
          if (storeCallback) {
            let linkRecord = storeCallback({ startClassRepObj: newLink.get('startClassRepObj'), endClassRepObj: newLink.get('endClassRepObj') });
            newLink.set({ 'repositoryObject': linkRecord });
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
      if (!Ember.isNone(type)) {
        let newLink = this.get('newLink');
        if (newLink.vertices().length === 0) {
          this.clearData();
          return true;
        } else {
          let newLink = this.get('newLink');
          newLink.removeVertex(-1);
        }
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
    }
  },

  /**
    See [Flexberry Ember API](http://flexberry.github.io/ember-flexberry/autodoc/develop/).

    @method save
  */
  save() {
    let model = this.get('model');
    model.set('primitivesJsonString', JSON.stringify(model.get('primitives')));

    return this._super(...arguments).then(() => {
      let createdClasses = this.get('createdClasses');
      let promises = createdClasses.map(c => c.save());
      createdClasses.clear();
      return Ember.RSVP.all(promises);
    });
  },

  /**
    Fills properties for create object.

    @method createObjectData
    @param {function} jointjsCallback function of creating a new object.
    @param {jQuery.Event} e event.
  */
  createObjectData(jointjsCallback, e) {
    if (!this.get('isLinkAdding')) {
      this._clearProperties();
      this.set('jointjsCallback', jointjsCallback);
      this.set('type', 'Object');
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
    this.set('interactionElements', Ember.A());
    this.set('newLink', undefined);
  },

  /**
    Change 'CurrentTargetElement'.

    @method _changeCurrentTargetElement
    @param {jQuery.Event} e event.
    @private
  */
  _changeCurrentTargetElement(e) {
    let currentTargetElement = this.get('currentTargetElement') || Ember.$('#pointer');
    currentTargetElement.removeClass('active');
    let newCurrentTargetElement = Ember.$(e.currentTarget);
    newCurrentTargetElement.addClass('active');
    this.set('currentTargetElement', newCurrentTargetElement);
  },

  /**
    Reset 'CurrentTargetElement'.

    @method _resetCurrentTargetElement
    @private
  */
  _resetCurrentTargetElement() {
    let currentTargetElement = this.get('currentTargetElement') || Ember.$('#pointer');
    currentTargetElement.removeClass('active');
    let pointer = Ember.$('#pointer');
    pointer.addClass('active');
    this.set('currentTargetElement', pointer);
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
    if (typeValue === 'object' && !Ember.isNone(value)) {
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
