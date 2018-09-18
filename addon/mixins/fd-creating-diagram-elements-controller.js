import Ember from 'ember';

/**
  Metods for creating joint js elements on diagrams.

  @class FdCreatingDiagramElementsControllerMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    Created 'Paper' from joint js.

    @property paper
    @type object
  */
  paper: undefined,

  /**
    Adding a listener on paper click for create object.

    @method createObjectEvents
    @param {function} callback function of creating a new object.
  */
  createObjectEvents(callback) {
    let paper = this.get('paper');
    paper.on('blank:pointerclick', this._createObject, [callback, this]);
    paper.on('blank:contextmenu', this._offObjectEvents, this);
  },

  /**
    Create joint js object on graph.

    @method _createObject
    @param {jQuery.Event} e event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
    @private
  */
  _createObject(e, x, y) {
    let _this = this;
    let [callback, _this2] = _this;

    let paper = _this2.get('paper');
    let graph = paper.model;
    let newObject = callback(x, y);
    graph.addCell([newObject]);
    paper.off('blank:pointerclick', _this2._createObject);
    paper.off('blank:contextmenu', _this2._offObjectEvents);
  },

  /**
    Deleting a listener on paper click for create object.

    @method _offObjectEvents
    @private
  */
  _offObjectEvents() {
    let paper = this.get('paper');
    paper.off('blank:pointerclick', this._createObject);
    paper.off('blank:contextmenu', this._offObjectEvents);
  },

  /**
    Adding a listener on paper click for create link.

    @method createLinkEvents
    @param {function} callback function of creating a new link.
    @param {Array} interactionElements array of object types with which the current link can interact.
    @private
  */
  createLinkEvents(callback, interactionElements) {
    let paper = this.get('paper');
    let linkProperties = {
      source: undefined,
      target: undefined,
      startClassRepObj: undefined,
      endClassRepObj: undefined,
      points: Ember.A()
    };
    paper.on('element:pointerclick', this._createLinkStart, [callback, interactionElements, linkProperties, this]);
    paper.on('blank:contextmenu', this._offLinkEvents, [linkProperties, this]);
  },

  /**
    Create first point joint js link on graph.

    @method _createLinkStart
    @param {Object} element selected joint js element.
    @private
  */
  _createLinkStart(element) {
    let _this = this;
    let [callback, interactionElements, linkProperties, _this2] = _this;

    let model = element.model.attributes;
    let type = model.type;
    if (!Ember.isNone(interactionElements.includes(type))) {
      linkProperties.source = model.id;
      linkProperties.startClassRepObj = model.repositoryObject;

      let paper = _this2.get('paper');
      paper.off('element:pointerclick', _this2._createLinkStart);
      paper.on('blank:pointerclick', _this2._createLinkPounts, [linkProperties, _this2]);
      paper.on('element:pointerclick', _this2._createLinkEnd, [callback, interactionElements, linkProperties, _this2]);
    }
  },

  /**
    Create last point joint js link on graph.

    @method _createLinkEnd
    @param {Object} element selected joint js element.
    @private
  */
  _createLinkEnd(element) {
    let _this = this;
    let [callback, interactionElements, linkProperties, _this2] = _this;

    let model = element.model.attributes;
    let type = model.type;
    if (!Ember.isNone(interactionElements.includes(type))) {
      linkProperties.target = model.id;
      linkProperties.endClassRepObj = model.repositoryObject;

      let paper = _this2.get('paper');
      let graph = paper.model;
      let newLink = callback(linkProperties);
      graph.addCell([newLink]);

      paper.off('element:pointerclick', _this2._createLinkEnd);
      paper.off('blank:pointerclick', _this2._createLinkPounts);
      paper.off('blank:contextmenu', _this2._offLinkEvents);
    }
  },

  /**
    Create between object point joint js link on graph.

    @method _createLinkPounts
    @param {jQuery.Event} e event.
    @param {Number} x coordinate x.
    @param {Number} y coordinate y.
    @private
  */
  _createLinkPounts(e, x, y) {
    let linkProperties = this[0];
    linkProperties.points.pushObject({ x: x, y: y });
  },

  /**
    Deleting a listener on paper click for create link or deleting created between object point.

    @method _offLinkEvents
    @private
  */
  _offLinkEvents() {
    let _this = this;
    let [linkProperties, _this2] = _this;
    if (linkProperties.points.length === 0) {
      let paper = _this2.get('paper');
      paper.off('element:pointerclick', _this2._createLinkStart);
      paper.off('blank:pointerclick', _this2._createLinkPounts);
      paper.off('element:pointerclick', _this2._createLinkEnd);
      paper.off('blank:contextmenu', _this2._offLinkEvents);
    } else {
      linkProperties.points.popObject();
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
  }
});
