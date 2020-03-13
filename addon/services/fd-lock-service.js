import Service from '@ember/service';
import { resolve } from 'rsvp';
import { isArray } from '@ember/array';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
  /**
    Returns repository object type.

     @method _getRepObjectType
     @param {Object} editedObject Currently editing object.
  */
  _getRepObjectType(editedObject) {
    if (editedObject) {
      switch (editedObject.primitive ? editedObject.primitive.$type : editedObject.constructor.modelName) {
        case 'fd-dev-class':
        case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
          return 'class';
        case 'STORMCASE.UML.cad.Aggregation, UMLCAD':
          return 'aggregation';
        case 'STORMCASE.UML.cad.Association, UMLCAD':
          return 'association';
      }
    }
  },

  /**
    Returns diagram type.

     @method _getDiagramType
     @param {Object} editedObject Currently editing object.
  */
  _getDiagramType(editedObject) {
    if (editedObject) {
      switch (editedObject.constructor.modelName) {
        case 'fd-dev-uml-ad':
          return 'ad';
        case 'fd-dev-uml-cad':
          return 'cad';
        case 'fd-dev-uml-cod':
          return 'cod';
        case 'fd-dev-uml-dpd':
          return 'dpd';
        case 'fd-dev-uml-sd':
          return 'sd';
        case 'fd-dev-uml-std':
          return 'std';
        case 'fd-dev-uml-ucd':
          return 'ucd';
      }
    }
  },

  /**
    Returns params for diagram lock query.

     @method _createParamsForDiagramLock
     @param {Object} editedObject Currently editing object.
  */
  _createParamsForDiagramLock(editedObject) {
    let params = {};
    const diagramType = this._getDiagramType(editedObject);
    let repObjectType;
    params['{' + editedObject.id + '}'] = diagramType;
    if (isArray(editedObject.primitives)) {
      editedObject.primitives.forEach(primitive => {
        repObjectType = this._getRepObjectType(primitive);
        if (repObjectType && primitive.repositoryObject) {
          params[primitive.repositoryObject] = repObjectType;
        }
      }, this);
    }

    return params;
  },

  init() {
    this._super(...arguments);
    const appConfig = getOwner(this).factoryFor('config:environment').class;
    this.set('refreshLockTime', get(appConfig, 'APP.lock.lockRefresh') || 300000);
  },

  /**
    Returns refresh lock time.

     @method getRefreshLockTime
  */
  getRefreshLockTime() {
    return this.get('refreshLockTime');
  },

  /**
    Returns created lock.

     @method createLock
     @param {Object} editedObject Currently editing object.
     @param {String} objectTypeName Edited object type name.
  */
  createLock(editedObject, objectTypeName) {
    if (editedObject) {
      let adapter = getOwner(this).lookup('adapter:application');
      if (objectTypeName === 'diagram-sheet') {
        const actionParams = this._createParamsForDiagramLock(editedObject);

        return adapter.callAction('LockDiagram', { objects: JSON.stringify(actionParams) }, null, { withCredentials: true }).then(result => {
          return JSON.parse(result.value);
        });
      }

      if (objectTypeName === 'edit-diagram-object-sheet' || objectTypeName === 'class-sheet') {
        const repObjectType = this._getRepObjectType(editedObject);
        return adapter.callAction('LockRepObject', { repObject: editedObject.id, objectType: repObjectType }, null, { withCredentials: true }).then(result => {
          return JSON.parse(result.value);
        });
      }
    }

    return resolve(false);
  },

  /**
    Returns true if lock was deleted.

     @method deleteLock
     @param {Object} editedObject Currently editing object.
     @param {String} objectTypeName Edited object type name.
  */
  deleteLock(editedObject, objectTypeName) {
    if (editedObject && editedObject.get('id') !== null) {
      let adapter = getOwner(this).lookup('adapter:application');
      if (objectTypeName === 'diagram-sheet') {
        const actionParams = this._createParamsForDiagramLock(editedObject);
        return adapter.callAction('UnlockDiagram', { objects: JSON.stringify(actionParams) }, null, { withCredentials: true }).then(result => {
          return result.value;
        });
      }

      if (objectTypeName === 'edit-diagram-object-sheet' || objectTypeName === 'class-sheet') {
        const repObjectType = this._getRepObjectType(editedObject);
        return adapter.callAction('UnlockRepObject', { repObject: editedObject.id, objectType: repObjectType }, null, { withCredentials: true }).then(result => {
          return result.value;
        });
      }
    }

    return resolve(false);
  },

  /**
    Returns specified lock.

     @method checkLock
     @param {Object} editedObject Currently editing object.
     @param {String} objectTypeName Edited object type name.
  */
  checkLock(editedObject, objectTypeName) {
    if (editedObject) {
      let adapter = getOwner(this).lookup('adapter:application');
      if (objectTypeName === 'diagram-sheet') {
        const diagramType = this._getDiagramType(editedObject);
        return adapter.callAction('GetDiagramLock', { diagram: editedObject.id, objectType: diagramType }, null, { withCredentials: true }).then(result => {
          return JSON.parse(result.value);
        });
      }

      if (objectTypeName === 'edit-diagram-object-sheet' || objectTypeName === 'class-sheet') {
        const repObjectType = this._getRepObjectType(editedObject);
        return adapter.callAction('GetRepObjectLock', { repObject: editedObject.id, objectType: repObjectType }, null, { withCredentials: true }).then(result => {
          return JSON.parse(result.value);
        });
      }
    }

    return resolve(false);
  }
});
