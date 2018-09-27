import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';
import FdAcrionsForCadPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cad-primitives';
import FdAcrionsForStdPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-std-primitives';
import FdAcrionsForCodPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-cod-primitives';
import FdAcrionsForCommonPrimitivesMixin from '../mixins/actions-for-primitives/fd-actions-for-common-primitives';

export default EditFormController.extend(
FdWorkPanelToggler,
FdFormUnsavedData,
FdAcrionsForCadPrimitivesMixin,
FdAcrionsForStdPrimitivesMixin,
FdAcrionsForCodPrimitivesMixin,
FdAcrionsForCommonPrimitivesMixin, {
  parentRoute: 'fd-diagram-list-form',

  /**
    Array elements to interact.

    @property interactionElements
    @type Array
  */
  interactionElements: Ember.A(),

  /**
    Function for create element.

    @property callback
    @type Function
  */
  callback: undefined,

  /**
    Type create object.

    @property type
    @type String
  */
  type: undefined,

  /**
    Data for create link.

    @property linkProperties
    @type Object
  */
  linkProperties: {
    source: undefined,
    target: undefined,
    startClassRepObj: undefined,
    endClassRepObj: undefined,
    points: Ember.A()
  },

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
          let callback = this.get('callback');
          let newObject = callback(x, y);
          this.clearData();

          return newObject;
        } else {
          let linkProperties = this.get('linkProperties');
          if (type === 'Link' && !Ember.isNone(linkProperties.target)) {
            linkProperties.points.insertAt(0, { x: x, y: y });
          }
        }
      }
    },

    /**
      Handler event elementPointerClick

      @method elementPointerClick
      @param {Object} options options event 'element:pointerclick'.
    */
    elementPointerClick(options) {
      let type = this.get('type');
      if (type === 'Link') {
        let element = options.element;
        let model = element.model.attributes;
        let type = model.type;
        let linkProperties = this.get('linkProperties');
        let interactionElements = this.get('interactionElements');

        if (Ember.isNone(linkProperties.target) && (Ember.isNone(interactionElements) ||
         (Ember.isArray(interactionElements) && interactionElements.includes(type)) ||
         (Ember.isArray(interactionElements.start) && interactionElements.start.includes(type)))) {

          linkProperties.target = model.id;
          linkProperties.startClassRepObj = model.repositoryObject;

        } else if (Ember.isNone(linkProperties.source) && (Ember.isNone(interactionElements) ||
         (Ember.isArray(interactionElements) && interactionElements.includes(type)) ||
         (Ember.isArray(interactionElements.end) && interactionElements.end.includes(type)))) {

          linkProperties.source = model.id;
          linkProperties.endClassRepObj = model.repositoryObject;
          let callback = this.get('callback');
          let newLink = callback(linkProperties);
          this.clearData();

          return newLink;
        }
      }
    },

    /**
      Handler event blankContextMenu

      @method blankContextMenu
      @param {Object} options options event 'blank:contextmenu'.
    */
    blankContextMenu() {
      let type = this.get('type');
      if (!Ember.isNone(type)) {
        let linkProperties = this.get('linkProperties');
        if (linkProperties.points.length === 0) {
          this.clearData();
        } else {
          linkProperties.points.popObject();
        }
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
    @param {function} callback function of creating a new object.
    @param {jQuery.Event} e event.
  */
  createObjectData(callback, e) {
    this._claerProperties();
    this.set('callback', callback);
    this.set('type', 'Object');
    this._changeCurrentTargetElement(e);
  },

  /**
    Fills properties for create link.

    @method createLinkData
    @param {function} callback function of creating a new link.
    @param {jQuery.Event} e event.
    @param {Array} interactionElements array of object types with which the current link can interact.
  */
  createLinkData(callback, e, interactionElements) {
    this._claerProperties();
    this.set('callback', callback);
    this.set('type', 'Link');
    this.set('interactionElements', interactionElements);
    this._changeCurrentTargetElement(e);
  },

  /**
    Resets data for create elements.

    @method clearData
  */
  clearData() {
    this._claerProperties();
    this._resetCurrentTargetElement();
  },

  /**
    Clear all properties for create elements.

    @method _claerProperties
    @private
  */
  _claerProperties() {
    this.set('callback', undefined);
    this.set('type', undefined);
    this.set('interactionElements', Ember.A());
    this.set('linkProperties', {
      source: undefined,
      target: undefined,
      startClassRepObj: undefined,
      endClassRepObj: undefined,
      points: Ember.A()
    });
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
