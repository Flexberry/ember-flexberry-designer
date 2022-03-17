/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import FdUmlLink from '../../objects/uml-primitives/fd-uml-link';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import uuid from 'npm:node-uuid';
import { updateObjectByStr } from '../../utils/fd-update-str-value';
import { getDataForBuildTree } from '../../utils/fd-attributes-for-tree';
import $ from 'jquery';

/**
  Mixin with key press logic for fd-uml-diagram component.

  @class FdFormUnsavedData
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
   Service for managing objects diagram.

   @property fdDiagramService
   @type {Class}
   @default Ember.inject.service()
   */
  fdDiagramService: service('fd-diagram-service'),

  /**
    Subscription on mouseover and keydown.

    @method subscriptionToKeyPress
    @param {Object} paper paper joint js.
  */
  subscriptionToKeyPress(paper) {
    let paperEl = paper.$el;
    paperEl.attr('tabindex', 0);

    paperEl.on('click', this._paperClickHandler);
    paperEl.on('keydown', this._keydownHandler.bind(this));
  },

  /**
    Paper 'click' handler.

    @method _paperClickHandler
  */
  _paperClickHandler() {
    this.focus();
  },

  /**
    Handler 'keydown'.

    @method _keydownHandler
    @param {Event} e event.
  */
  _keydownHandler(e) {
    if ($(e.target).is('textarea,input')) {
      return;
    }

    if (e.ctrlKey) {
      e.stopPropagation();

      let preventDefault = true;
      switch (e.keyCode) {
        // ctrl + a
        case 65:
          this.highlightAllElements();
        break;

        // ctrl + c
        case 67:
          this.copyHighlightElements(false);
        break;

        // ctrl + x
        case 88:
          this.copyHighlightElements(true);
        break;

        // ctrl + v
        case 86:
          preventDefault = false;
          this.pasteCopyElements();
        break;

        // ctrl + z
        case 90:
          this.undoChanges();
        break;

        // ctrl + y
        case 89:
          this.redoChanges();
        break;

        // ctrl + s
        case 83:
          this.saveDiagram();
        break;
      }

      if (preventDefault) {
        e.preventDefault();
      }

      this.get('paper').$el.focus();

    } else if (e.keyCode === 46) {
      e.stopPropagation();
      e.preventDefault();
      this.deleteSelectElements();
    }
  },

  /**
    Handler 'ctrl + a' select all diagram elements.

    @method highlightAllElements
  */
  highlightAllElements() {
    let paper = this.get('paper');
    let graph = this.get('graph');
    let cells = graph.getCells();
    cells.forEach((cell) => {
      let cellView = paper.findViewByModel(cell);
      cellView.highlight(null, { highlightAll: true });
    });
  },

  /**
    Handler 'ctrl + c' copy selected diagram elements.

    @method copyHighlightElements
  */
  copyHighlightElements(isCut) {
    let readonly = this.get('readonly');
    if (readonly && isCut) {
      return;
    }

    let copyPrimitive = A();
    let copyRepObjects = A();

    let highlightedAllElements = this.get('highlightedElements');
    let highlightedElements = highlightedAllElements.filter((a) => a.model.isElement());
    let highlightedLinks = highlightedAllElements.filter((a) => a.model.isLink());

    let elements = this.get('elements');
    highlightedElements.forEach((element) => {
      let id = get(element, 'model.id');
      let model = elements.findBy('id', id);
      let repObject = model.repositoryObject;
      if (!isNone(repObject)) {
        let repObjectId = repObject.slice(1, -1);
        let classObject = this.get('store').peekRecord('fd-dev-class', repObjectId);
        copyRepObjects.pushObject({
          type: 'fd-dev-class',
          data: classObject,
          views: classObject.get('views').map((a) => a.serialize({ includeId: true })),
          formViews: classObject.get('formViews').map((a) => {
            let serializeObj = a.serialize({ includeId: true });
            serializeObj[`View@odata.bind`] = a.get('view.name');
            serializeObj[`Class@odata.bind`] = a.get('class.name');

            return serializeObj;
          }),
        });
      }

      copyPrimitive.pushObject(model.primitive);
    });

    let links = this.get('links');
    highlightedLinks.forEach((link) => {
      let id = get(link, 'model.id');
      let model = links.findBy('id', id);
      let sourceElement = copyPrimitive.findBy('$id', get(model, 'source.id'));
      let targetElement = copyPrimitive.findBy('$id', get(model, 'target.id'));
      if (!isNone(sourceElement) && !isNone(targetElement)) {
        let repObject = model.repositoryObject;
        if (!isNone(repObject)) {
          let repObjectId = repObject.slice(1, -1);
          let modelName = this._getModelName(model.primitive.$type);
          let linkObject = this.get('store').peekRecord(modelName, repObjectId);
          copyRepObjects.pushObject({
            type: modelName,
            data: linkObject
          });
        }

        copyPrimitive.pushObject(model.primitive);
      }
    });

    let copyValue = {
      type: this.get('model.constructor.modelName'),
      primitives: copyPrimitive,
      repObjects: copyRepObjects.uniqBy('data.id').map((a) => {
        a.data = a.data.serialize({ includeId: true });
        return a;
      })
    };

    // Create new element
    let el = document.createElement('textarea');

    // Set value (string to be copied), set non-editable to avoid focus and move outside of view
    el.value =  JSON.stringify(copyValue);
    el.style = { display: 'none' };
    document.body.appendChild(el);

    // Select text inside element, copy text to clipboard and remove temporary element.
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (isCut) {
      this.deleteSelectElements();
    }
  },

  /**
    Handler 'ctrl + v'.

    @method pasteCopyElements
  */
  pasteCopyElements() {
    let readonly = this.get('readonly');
    if (readonly) {
      return;
    }

    window.addEventListener('paste', this.createPasteElementsOnDiagram.bind(this), { once: true });
  },

  /**
    Create object on diagrams.

    @method createPasteElementsOnDiagram
    @param {Event} e event.
  */
  createPasteElementsOnDiagram(e) {
    e.stopPropagation();
    e.preventDefault();

    let json = e.clipboardData.getData('text/plain');
    let model = this.get('model');
    let pasteValue = this._parsePasteData(json);
    if (pasteValue.type !== model.get('constructor.modelName')) {
      return;
    }

    let primitives = pasteValue.primitives;
    let repObjects = pasteValue.repObjects;

    // Create new rep objects.
    let store = this.get('store');
    let listRepObject = A();
    let dictionaryRepObjId = A();
    repObjects.forEach((repObject) => {
      let stage = this.get('currentProjectContext').getCurrentStageModel();
      let allObjects = store.peekAll(repObject.type);
      let allObjectsCurrentStage = allObjects.filterBy('stage.id', stage.get('id'));

      let existObject;
      if (repObject.type === 'fd-dev-class') {
        existObject = allObjectsCurrentStage.findBy('name', repObject.data.Name);
      } else {
        let isInh = repObject.type === 'fd-dev-inheritance' || repObject.type === 'fd-dev-realization';
        existObject = allObjectsCurrentStage.find((a) => {
          let repStartObj = repObject.data[`${(isInh ? 'Parent' : 'StartClass')}@odata.bind`].slice(12, -1);
          repStartObj = this._findNewObjectId(repStartObj, dictionaryRepObjId);
          let repEndObj = repObject.data[`${(isInh ? 'Child' : 'EndClass')}@odata.bind`].slice(12, -1);
          repEndObj = this._findNewObjectId(repEndObj, dictionaryRepObjId);
          let repStartRole = repObject.data.StartRole;
          let repEndRole = repObject.data.EndRole;
          let repDescription = repObject.data.Description;
          if (
            a.get(`${(isInh ? 'parent' : 'startClass')}.id`) === repStartObj &&
            a.get(`${(isInh ? 'child' : 'endClass')}.id`) === repEndObj &&
            a.get(`startRole`) === repStartRole &&
            a.get(`endRole`) === repEndRole &&
            a.get(`description`) === repDescription
            ) {
              return a;
          }
        });
      }

      if (isNone(existObject)) {
        let repObj = this._addObjectInStore(repObject.type, repObject.data, dictionaryRepObjId);
        repObj.set('stage', stage);

        listRepObject.pushObject(repObject);
      } else {

        this._incrementPropertyReferenceCount(existObject);
        dictionaryRepObjId.pushObject({
          oldId: repObject.data.__PrimaryKey,
          newId: existObject.get('id')
        });
      }
    });

    // Add primitives on diagram.
    let dictionaryPrimitivesId = A();
    let newPrimitives = primitives.map((primitive) => {
      let umlObject = model.createUmlObject(primitive);
      let oldId = umlObject.get('id');
      let newId = this._createNewPrimitiveId(oldId, dictionaryPrimitivesId);
      umlObject.set('primitive.$id', newId);

      if (umlObject instanceof FdUmlLink) {
        let oldSourceId = umlObject.get('source.id');
        let newSourceId = this._createNewPrimitiveId(oldSourceId, dictionaryPrimitivesId);
        umlObject.set('primitive.StartPrimitive.$ref', newSourceId);

        let oldTargetId = umlObject.get('target.id');
        let newTargetId = this._createNewPrimitiveId(oldTargetId, dictionaryPrimitivesId);
        umlObject.set('primitive.EndPrimitive.$ref', newTargetId);

        let oldStartLEParent = umlObject.get('primitive.StartLE.Parent.$ref');
        let newStartLEParent = this._createNewPrimitiveId(oldStartLEParent, dictionaryPrimitivesId);
        umlObject.set('primitive.StartLE.Parent.$ref', newStartLEParent);

        let oldStartLEPrimitive = umlObject.get('primitive.StartLE.Primitive.$ref');
        let newStartLEPrimitive = this._createNewPrimitiveId(oldStartLEPrimitive, dictionaryPrimitivesId);
        umlObject.set('primitive.StartLE.Primitive.$ref', newStartLEPrimitive);

        let oldEndLEParent = umlObject.get('primitive.EndLE.Parent.$ref');
        let newEndLEParent = this._createNewPrimitiveId(oldEndLEParent, dictionaryPrimitivesId);
        umlObject.set('primitive.EndLE.Parent.$ref', newEndLEParent);

        let oldEndLEPrimitive = umlObject.get('primitive.EndLE.Primitive.$ref');
        let newEndLEPrimitive = this._createNewPrimitiveId(oldEndLEPrimitive, dictionaryPrimitivesId);
        umlObject.set('primitive.EndLE.Primitive.$ref', newEndLEPrimitive);
      }

      let repositoryObject = umlObject.repositoryObject;
      if(!isNone(repositoryObject)) {
        let newRepositoryObject = this._findNewObjectId(repositoryObject.slice(1, -1), dictionaryRepObjId);
        umlObject.set('primitive.RepositoryObject', `{${newRepositoryObject}}`);
      }

      this._addToPrimitives(umlObject);
      let element = umlObject.JointJS();

      return element;
    });
    this.get('graph').addCells(newPrimitives);
    const paper = this.get('paper');
    this.createAddDeleteSteps(newPrimitives.map(cellModel => {
      return paper.findViewByModel(cellModel);
    }));

    // Add link properties.
    let addLinks = listRepObject.filter(a => a.type !== 'fd-dev-class');
    addLinks.forEach((linkObj) => {

      // Add start and end class.
      let linkId = this._findNewObjectId(linkObj.data.__PrimaryKey, dictionaryRepObjId);
      let linkRepObj = store.peekRecord(linkObj.type, linkId);

      let isInh = linkObj.type === 'fd-dev-inheritance' || linkObj.type === 'fd-dev-realization';
      let repStartObj = linkObj.data[`${(isInh ? 'Parent' : 'StartClass')}@odata.bind`].slice(12, -1);
      let repEndObj = linkObj.data[`${(isInh ? 'Child' : 'EndClass')}@odata.bind`].slice(12, -1);

      let repStartObjId = this._findNewObjectId(repStartObj, dictionaryRepObjId);
      let repEndObjId = this._findNewObjectId(repEndObj, dictionaryRepObjId);

      let startClass = store.peekRecord('fd-dev-class', repStartObjId);
      let endClass = store.peekRecord('fd-dev-class', repEndObjId);

      linkRepObj.set(`${(isInh ? 'parent' : 'startClass')}`, startClass);
      linkRepObj.set(`${(isInh ? 'child' : 'endClass')}`, endClass);
    });

    // Add class properties.
    let addClasses = listRepObject.filter(a => a.type === 'fd-dev-class');
    addClasses.forEach((classObj) => {

      // Add attributes and methods.
      let clsId = this._findNewObjectId(classObj.data.__PrimaryKey, dictionaryRepObjId);
      let clsObj = store.peekRecord('fd-dev-class', clsId);
      updateObjectByStr(clsObj, store);

      // Add bs.
      let bs = classObj.data[`BusinessServerClass@odata.bind`];
      if (!isNone(bs)) {
        let bsId = this._findNewObjectId(bs.slice(12, -1), dictionaryRepObjId);
        let bsObj = store.peekRecord('fd-dev-class', bsId);

        if (!isNone(bsObj)) {
          clsObj.set('businessServerClass', bsObj);
        }
      }

      // Add views.
      let views = classObj.views;
      views.forEach((view) => {
        let obj = this._addObjectInStore('fd-dev-view', view, dictionaryRepObjId);
        obj.set('class', clsObj);

        let definitionArray = obj.get('definitionArray');
        let deleteDefinition = A();
        definitionArray.forEach((definition) => {
          let defName = definition.get('name');
          let defNamePart = defName.split('.');
          let currentClass = clsObj;
          for (var i = 0; i < defNamePart.length; i++) {
            let name = defNamePart[i];

            let isExistObj;
            if (i === defNamePart.length - 1) {
              isExistObj = this._checkExistProp(currentClass, name, true);
            } else {
              isExistObj = this._checkExistProp(currentClass, name, false);
            }

            if (!isNone(isExistObj)) {
              currentClass = isExistObj;
            } else {
              deleteDefinition.pushObject(definition);
              break;
            }
          }
        });

        if (deleteDefinition.length > 0) {
          definitionArray.removeObjects(deleteDefinition);

          //For trigger computed propherty in fd-dev-view model.
          obj.get('definitionArray');
        }
      });
    });

    // Add formViews.
    addClasses.forEach((classObj) => {
      let formViews = classObj.formViews;
      formViews.forEach((formView) => {
        let viewName = formView[`View@odata.bind`];
        let clsName = formView[`Class@odata.bind`];

        if (!isNone(viewName) && !isNone(clsName)) {
          let allClasses = store.peekAll('fd-dev-class');
          let allClassesCurrentStage = allClasses.filterBy('stage.id', this.get('currentProjectContext').getCurrentStage());
          let clsObj = allClassesCurrentStage.findBy('name', clsName);

          if (!isNone(clsObj)) {
            let views = clsObj.get('views');
            let viewObj = views.findBy('name', viewName);
            if (!isNone(viewObj)) {
              let obj = this._addObjectInStore('fd-dev-form-view', formView, dictionaryRepObjId);
              obj.set('class', clsObj);
              obj.set('view', viewObj);
            }
          }
        }
      });
    });
  },

  /**
    Handler 'ctrl + s' save open diagram.

    @method saveDiagram
  */
  saveDiagram() {
    let readonly = this.get('readonly');
    if (!readonly) {
      this.get('fdSheetService').saveCurrentItem('diagram-sheet');
    }
  },

  /**
    Handler 'delete' delete selected diagram elements.

    @method deleteSelectElements
  */
  deleteSelectElements() {
    let readonly = this.get('readonly');
    if (readonly) {
      return;
    }

    let highlightedElements = this.get('highlightedElements');
    this.createAddDeleteSteps(highlightedElements, true);
    highlightedElements.forEach((highlightedElement) => {
      highlightedElement.model.remove();
    });

    highlightedElements.clear();
  },

  /**
    Add new object to diagram's primitives.

    @method _addToPrimitives
    @param {Object} umlClass
   */
  _addToPrimitives(umlClass) {
    if (!umlClass) {
      return;
    }

    let primitives = this.get('primitives');
    if (isArray(primitives)) {
      primitives.pushObject(umlClass);
    } else {
      this.set('primitives', A([ umlClass ]));
    }
  },

  /**
    Parse json to array diagram's primitives objects.

    @method _parsePasteData
    @param {String} json
   */
  _parsePasteData(json) {
    try {
      let pasteValue = JSON.parse(json);

      return pasteValue;
    } catch(e) {
      return {};
    }
  },

  /**
    Create new id for diagram's primitives.

    @method _createNewPrimitiveId
    @param {String} oldId
    @param {Array} dictionaryPrimitivesId
   */
  _createNewPrimitiveId(oldId, dictionaryPrimitivesId) {
    let dictionaryValue = dictionaryPrimitivesId.findBy('oldId', oldId);
    if (isNone(dictionaryValue)) {
      let newId = `{${uuid.v4()}}`;
      dictionaryPrimitivesId.pushObject({
        oldId: oldId,
        newId: newId
      });

      return newId;
    }

    return dictionaryValue.newId;
  },

  /**
    Find new id for rep objects.

    @method _findNewObjectId
    @param {String} oldId
    @param {Array} dictionaryId
   */
  _findNewObjectId(oldId, dictionaryId) {
    let dictionaryValue = dictionaryId.findBy('oldId', oldId);
    if (isNone(dictionaryValue)) {
      return oldId;
    }

    return dictionaryValue.newId;
  },

  /**
    Check view prop on exist.

    @method _checkExistProp
    @param {Object} cls class
    @param {String} name propery name
    @param {Bool} isAttr is attributes
   */
  _checkExistProp(cls, name, isAttr) {
    let dataForClass = getDataForBuildTree(this.get('store'), cls.get('id'));

    let findFunction = function(item) {
      let isAgg = item.get('constructor.modelName');
      let cls = item.get(`${(isAgg ? 'endClass' : 'startClass')}`);
      let value = item.get(`${(isAgg ? 'endRole' : 'startRole')}`) || cls.get('name');

      return value === name;
    }

    let isExist;
    if (isAttr) {
      isExist = dataForClass.classes.find((cls) => {
        let clsIsExist = cls.get('attributes').findBy('name', name);

        return !isNone(clsIsExist);
      });
      if (isNone(isExist)) {
        isExist = dataForClass.aggregations.find(findFunction);
      }
      if (isNone(isExist)) {
        isExist = dataForClass.associations.find(findFunction);
      }
    } else {
      isExist = dataForClass.associations.find(findFunction);
    }

    return isExist;
  },

  /**
    Create new model.

    @method _addObjectInStore
    @param {String} modelName model name
    @param {Object} object serialize model
    @param {Array} dictionaryRepObjId dictionary id
   */
  _addObjectInStore(modelName, object, dictionaryRepObjId) {
    let store = this.get('store');
    let newId = uuid.v4();
    let normalize = store.normalize(modelName, object);
    let model = store.createRecord(modelName, {
      id: newId
    });
    model.setProperties(normalize.data.attributes);
    model.set('referenceCount', 1);
    dictionaryRepObjId.pushObject({
      oldId: object.__PrimaryKey,
      newId: newId
    });

    return model;
  },

  /**
    Trigger keypress logic.

    @method _triggerKeypressLogic
    @param {String} eventName event name
   */
  _triggerKeypressLogic(eventName) {
    switch (eventName) {
      case 'copy':
        this.copyHighlightElements(false);
        break;
      case 'cut':
        this.copyHighlightElements(true);
        break;
      case 'undo':
        this.undoChanges();
        break;
      case 'redo':
        this.redoChanges();
        break;
    }
  },

  /**
    Initialization hook.
  */
  init() {
    this._super(...arguments);

    this.get('fdDiagramService').on('keypressLogicTriggered', this, this._triggerKeypressLogic);
  },

  /**
    Destroys helper.
  */
  willDestroy() {
    this._super(...arguments);

    this.get('fdDiagramService').off('keypressLogicTriggered', this, this._triggerKeypressLogic);
  }
});
