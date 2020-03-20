import Mixin from '@ember/object/mixin';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import QueryBuilder from 'ember-flexberry-data/query/builder';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';

export default Mixin.create({
  /**
    Current history step number.

    @property historyStep
    @type Integer
    @default 0
  */
  historyStep: 0,

  /**
    Diagram temporary id (for this edit session).

    @property diagramTempId
    @type String
    @default undefined
  */
  diagramTempId: undefined,

  /**
    Audit model name.

    @property auditModelName
    @type String
    @default 'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-field'
  */
  auditModelName: 'i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-field',

  /**
    Text color property path.

    @property textColorPath
    @type String
    @default 'primitive.DrawStyle.TextColor'
  */
  textColorPath: 'primitive.DrawStyle.TextColor',

  /**
    Brush color property path.

    @property brushColorPath
    @type String
    @default 'primitive.DrawStyle.TextColor'
  */
  brushColorPath: 'primitive.DrawStyle.DrawBrush.Color',

  willDestroyElement() {
    this._super(...arguments);

    const auditModelName = this.get('auditModelName');
    const store = this.get('store.offlineStore');
    const diagramTempId = this.get('diagramTempId');
    const predicate = new SimplePredicate('auditEntity.source', '==', diagramTempId);
    let builder = new QueryBuilder(store)
      .from(auditModelName)
      .where(predicate);
    store.query(auditModelName, builder.build()).then(function(data) {
      data.forEach(record => {
        record.destroyRecord();
      });
    });
  },

  /**
    Create history step for Add or Delete operation.

    @method createAddDeleteSteps
    @param elements Added/deleted elements
    @param isDelete indicates delete operation
  */
  createAddDeleteSteps(elements, isDelete) {
    if (!isArray(elements)) {
      elements = A([elements]);
    }

    const operation = isDelete ? 'Delete' : 'Add';

    let changes = A();
    elements.forEach(element => {
      const elementObjectModel = element.model.get('objectModel');
      const elementJson = JSON.stringify(elementObjectModel);
      changes.addObject({ field: operation, oldValue: elementJson, newValue: null });
      if (isDelete) {
        const connectedLinks = this.graph.getConnectedLinks(element.model);
        connectedLinks.forEach(linkModel => {
          const linkJson = JSON.stringify(linkModel.get('objectModel'));
          changes.addObject({ field: 'DeleteCascade', oldValue: linkJson, newValue: null });
        }, this);
      }
    }, this);

    this._createHistoryRecord(null, changes);
  },

  /**
    Undo last history step.

    @method undoChanges
  */
  undoChanges() {
    let historyStep = this.get('historyStep');
    if (historyStep > 0) {
      historyStep--;
      this.decrementProperty('historyStep');
      const auditModelName = this.get('auditModelName');
      const store = this.get('store.offlineStore');
      const diagramTempId = this.get('diagramTempId');
      const predicate1 = new SimplePredicate('auditEntity.source', '==', diagramTempId);
      const predicate2 = new SimplePredicate('auditEntity.operationType', '==', `${historyStep}`);
      let builder = new QueryBuilder(store)
        .from(auditModelName)
        .where(predicate1.and(predicate2));
      store.query(auditModelName, builder.build()).then(function(data) {
        const cellId = data.get('firstObject.auditEntity.objectPrimaryKey');
        let cell = this.graph.getCell(cellId);
        this._undoRedoHelper(data, cell);
      }.bind(this));
    }
  },

  /**
    Redo last history step.

    @method redoChanges
  */
  redoChanges() {
    let historyStep = this.get('historyStep');
    const auditModelName = this.get('auditModelName');
    const store = this.get('store.offlineStore');
    const diagramTempId = this.get('diagramTempId');
    const predicate1 = new SimplePredicate('auditEntity.source', '==', diagramTempId);
    const predicate2 = new SimplePredicate('auditEntity.operationType', '==', `${historyStep}`);
    let builder = new QueryBuilder(store)
      .from(auditModelName)
      .where(predicate1.and(predicate2));
    store.query(auditModelName, builder.build()).then(function(data) {
      if (data.get('length') > 0) {
        const cellId = data.get('firstObject.auditEntity.objectPrimaryKey');
        let cell = this.graph.getCell(cellId);
        this.incrementProperty('historyStep');
        this._undoRedoHelper(data, cell, true);
      }
    }.bind(this));
  },

  /**
    Redo last history step.

    @method _undoRedoHelper
    @param allChanges All changes for undo/redo
    @param cell Changed diagram element
    @param isRedo Indicates undo or redo
  */
  _undoRedoHelper(allChanges, cell, isRedo) {
    const textColorPath = this.get('textColorPath');
    const brushColorPath = this.get('brushColorPath');
    let changes = {};
    let colors = {};
    let deleteCascade = A();
    let addDelete = A();
    let size;
    allChanges.forEach(d => {
      let newValue;
      switch (d.field) {
        case 'Add':
        case 'Delete':
        case 'DeleteCascade':
          newValue = JSON.parse(d.oldValue);
          break;
        default:
          newValue = JSON.parse(isRedo ? d.newValue : d.oldValue);
      }

      switch (d.field) {
        case 'position':
          cell.position(newValue.x, newValue.y);
          this._refreshLinks(cell);
          break;
        case 'size':
          size = newValue;
          break;
        case 'textColor':
          colors[`${textColorPath}.R`] = newValue[0];
          colors[`${textColorPath}.G`] = newValue[1];
          colors[`${textColorPath}.B`] = newValue[2];
          colors[`${textColorPath}.A`] = newValue[3];
          break;
        case 'brushColor':
          colors[`${brushColorPath}.R`] = newValue[0];
          colors[`${brushColorPath}.G`] = newValue[1];
          colors[`${brushColorPath}.B`] = newValue[2];
          colors[`${brushColorPath}.A`] = newValue[3];
          break;
        case 'collapsed':
          this._updateCollapsedClass(cell);
          break;
        case 'vertices':
          cell.vertices(newValue);
          this._updateCellInputs(cell);
          break;
        case 'source':
          this._updateLinkEnd(cell, newValue, true);
          break;
        case 'target':
          this._updateLinkEnd(cell, newValue);
          break;
        case 'Delete':
          addDelete.addObject({newValue, isRedo});
          break;
        case 'DeleteCascade':
          deleteCascade.addObject({newValue});
          break;
        case 'Add':
          addDelete.addObject({newValue, isRedo: !isRedo});
          break;
        default:
          changes[d.field] = newValue;
      }
    }, this);

    if (addDelete.get('length') > 0) {
      this._handleAddDelete(addDelete, addDelete[0].isRedo, deleteCascade);
    }

    if (!isNone(cell)) {
      const objectModel = cell.get('objectModel');
      if (Object.keys(colors).length > 0) {
        objectModel.setProperties(colors);
        this._updateColors(cell);
      }

      if (Object.keys(changes).length > 0) {
        objectModel.setProperties(changes);
        this._updateRepObject(objectModel, changes);
        this._updateCellInputs(cell, size);
      } else {
        this._resizeCell(cell, size);
      }
    }
  },

  /**
    Undo/redo add/delete operation.

    @method _handleAddDelete
    @param changedCells All changed elements
    @param isRedo Indicates undo or redo
    @param cascade Elements that was cascade deleted
  */
  _handleAddDelete(changedCells, isRedo, cascade = A()) {
    if (isRedo) {
      changedCells.forEach(c => {
        const cellJson = JSON.parse(c.newValue);
        const cell = this.graph.getCell(cellJson.$id);
        if (cell) {
          cell.remove();
        }
      });
    } else {
      let added = false;
      const model = this.get('model');
      changedCells.sort((a, b) => {
        const aIsLink = !isNone(JSON.parse(a.newValue).Points);
        const bIsLink = !isNone(JSON.parse(b.newValue).Points);

        if (aIsLink && bIsLink || !aIsLink && !bIsLink) {
          return 0;
        } else {
          return aIsLink ? 1 : -1;
        }
      });
      changedCells.forEach(c => {
        let objectModel = model.createUmlObject(JSON.parse(c.newValue));
        const cell = objectModel.JointJS();
        if (!this.graph.getCell(cell.get('id'))) {
          this._addToPrimitives(objectModel);
          this.graph.addCell(cell);
          added = true;
          let repositoryObjectId = objectModel.get('repositoryObject');
          if (repositoryObjectId) {
            const store = this.get('store');
            const modelName = this._getModelName(objectModel.get('primitive.$type'));

            let repositoryObject = store.peekRecord(modelName, repositoryObjectId.slice(1, -1));
            if (!isNone(repositoryObject)) {
              this._incrementPropertyReferenceCount(repositoryObject);
            }
          }
        }
      }, this);

      if (added && cascade.get('length') > 0) {
        this._handleAddDelete(cascade, isRedo);
      }
    }
  },

  /**
    Set changes to repository object.

    @method _updateRepObject
    @param objectModel Element's object model
    @param changes All changes
  */
  _updateRepObject(objectModel, changes) {
    const repObjectId = objectModel.get('repositoryObject');
    if (isNone(repObjectId)) {
      return;
    }

    for (let change in changes) {
      let key = change;
      if (key === 'attributes' || key === 'methods') {
        key += 'Str';
      }

      if (key === 'startRole' || key === 'endRole') {
        key += 'Txt';
      }

      this._updateRepObj(objectModel, key, changes[key]);
    }
  },

  /**
    Update element input values.

    @method _updateCellInputs
    @param cellModel Element drom diagram
    @param size New element size
  */
  _updateCellInputs(cellModel, size) {
    const paper = this.get('paper');
    const cellView = paper.findViewByModel(cellModel);
    cellView.setInputValues();
    if (cellModel.isLink()) {
      cellView._verticesChanged();
      return;
    }

    if (!isNone(size)) {
      cellView.updateRectangles(size.width, size.height);
      this._refreshLinks(cellModel);
    } else {
      cellView.updateRectangles();
    }
  },

  /**
    Update element colors.

    @method _updateColors
    @param cellModel Element drom diagram
  */
  _updateColors(cellModel) {
    const paper = this.get('paper');
    const cellView = paper.findViewByModel(cellModel);
    cellView.setColors();
  },

  /**
    Update element size.

    @method _resizeCell
    @param cellModel Element drom diagram
    @param size New element size
  */
  _resizeCell(cellModel, size) {
    if (!isNone(size) && !cellModel.isLink()) {
      const paper = this.get('paper');
      const cellView = paper.findViewByModel(cellModel);
      cellView.updateRectangles(size.width, size.height);
      this._refreshLinks(cellModel);
    }
  },

  /**
    Update link source or target.

    @method _updateLinkEnd
    @param cellModel Element drom diagram
    @param newValue New value
    @param isSource Indicates source or target
  */
  _updateLinkEnd(cellModel, newValue, isSource) {
    const paper = this.get('paper');
    const cellView = paper.findViewByModel(cellModel);
    cellView.unhighlight();
    const objectModel = cellModel.get('objectModel');

    if (isSource) {
      objectModel.set('startPointRef', undefined);
      cellModel.source(newValue);
    } else {
      objectModel.set('endPointRef', undefined);
      cellModel.target(newValue);
    }
  },

  /**
    Update collapsed value of element.

    @method _updateCollapsedClass
    @param cellModel Element drom diagram
  */
  _updateCollapsedClass(cellModel) {
    const paper = this.get('paper');
    const cellView = paper.findViewByModel(cellModel);
    cellView.collapseElementView();
  },

  /**
    Update all links of element.

    @method _refreshLinks
    @param cellModel Element drom diagram
  */
  _refreshLinks(cellModel) {
    const paper = this.get('paper');
    const links = paper.model.getConnectedLinks(cellModel);
    links.forEach((link)=> {
      let linkView = paper.findViewByModel(link);
      linkView.updateBox();
      linkView.update();
      if (linkView.model.get('highlighted')) {
        linkView.unhighlight();
        linkView.highlight();
      }
    });
  },

  /**
    Create history record.

    @method _createHistoryRecord
    @param elementId Id of changed element
    @param changes All changes
  */
  _createHistoryRecord(elementId, changes) {
    if (!isArray(changes)) {
      changes = A([changes]);
    }

    const auditModelName = this.get('auditModelName');
    const historyStep = this.get('historyStep');
    const store = this.get('store.offlineStore');
    const predicate1 = new SimplePredicate('auditEntity.source', '==', this.get('diagramTempId'));
    const predicate2 = new SimplePredicate('auditEntity.operationType', '>=', `${historyStep}`);
    let builder = new QueryBuilder(store)
      .from(auditModelName)
      .where(predicate1.and(predicate2));
    store.query(auditModelName, builder.build()).then(function(data) {
      data.forEach(d => {
        let entity = d.get('auditEntity');
        d.destroyRecord();
        entity.destroyRecord();
      }, this);

      let record = store.createRecord('i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-entity');
      record.set('source', this.get('diagramTempId'));
      record.set('objectPrimaryKey', elementId);
      record.set('operationType', this.get('historyStep'));
      //record.set('objectType', this.get('historyStep'));
      let records = A([record]);
      changes.forEach(ch => {
        const oldValue = JSON.stringify(ch.oldValue);
        const newValue = JSON.stringify(ch.newValue);
        if (oldValue !== newValue) {
          let change = store.createRecord('i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-audit-field');
          change.set('field', ch.field);
          change.set('newValue', newValue);
          change.set('oldValue', oldValue);
          change.set('auditEntity', record);
          records.addObject(change);
        }
      }, this);

      if (records.get('length') === 1) {
        record.rollbackAll();
        return;
      }

      store.batchUpdate(records);
      this.incrementProperty('historyStep');
    }.bind(this));
  },
});
