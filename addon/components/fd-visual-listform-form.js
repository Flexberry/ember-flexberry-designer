import Ember from 'ember';
import layout from '../templates/components/fd-visual-listform-form';

import FdDataTypes from '../utils/fd-datatypes';

export default Ember.Component.extend({
  layout,

  _prevRowsValues: undefined,

  _prevRowsTypes: undefined,

  dataTypes: undefined,

  selectedCol: undefined,

  listformName: '',

  listAttributes: [],

  editControl: {},

  rowsValues:  Ember.computed(
    'listAttributes',
    'editControl.type',
    function() {
      let editControlType = this.get('dataTypes').flexberryTypeToFD(this.editControl.type);
      if (/*this.selectedCol === undefined && this._prevRowsValues !== undefined && this._prevRowsValues.length === this.listAttributes.length ||*/
        this.selectedCol !== undefined &&
        typeof this._prevRowsTypes === 'object' &&
        this._prevRowsTypes[this.selectedCol] === editControlType) {
        return this._prevRowsValues;
      }

      let ret = [];
      for (let nRow = 0; nRow < 4; nRow++) {
        ret[nRow] = [];
      }

      this._prevRowsTypes = [];
      let attributes = this.listAttributes;
      for (let nCol = 0; nCol < attributes.length; nCol++) {
        let attribute = attributes[nCol];
        this._prevRowsTypes[nCol] = attribute.type;
        for (let nRow = 0; nRow < 4; nRow++) {
          let value;
          if (this.selectedCol !== undefined &&  this.selectedCol !== nCol && this._prevRowsValues !== undefined) {
            value = this._prevRowsValues[nRow][nCol];
          } else {
            value = this.get('dataTypes').randomValue(attribute.type);
          }

          ret[nRow][nCol] = value;
        }
      }

      this._prevRowsValues = ret;
      return ret;
    }
  ),

  previousSelectedCol: undefined,

  selectedCols:  Ember.computed('selectedCol', 'listAttributes', function() {
    let ret = [];
    for (let i = 0; i < this.listAttributes.length; i++) {
      ret[i] = (typeof (this.selectedCol) !== 'undefined' && this.selectedCol === i);
    }

    return ret;
  }),

  attributes:  Ember.computed(
    'listAttributes',
    'editControl.name',
    'editControl.type',
    'editControl.defaultValue',
    function() {
    this._reNumberAttributes(this.listAttributes);
    let ret = Ember.A();
    let attributes = this.listAttributes;
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      if (this.selectedCol === i) {
        let editControl = this.editControl;
        attribute.name = editControl.name;
        attribute.type = this.get('dataTypes').flexberryTypeToFD(editControl.type);
        attribute.defaultValue = editControl.defaultValue;
      }

      let obj = Ember.Object.create(attribute);
      ret.addObject(obj);
    }

    return ret;
  }),

  init() {
    if (!this.get('dataTypes')) {
      this.set('dataTypes', FdDataTypes.create());
    }

    return this._super();
  },

  didRender: function() {
    this._super(...arguments);
    this._setDOMSelectedColumn();
  },

  _setDOMSelectedColumn: function() {
    if (typeof this.selectedCol === 'undefined') {
      return;
    }

    for (let tr =  Ember.$('#attributeList')[0]; tr; tr = tr.nextElementSibling) {
      let tds = tr.children;
      if (typeof this.previousSelectedCol !== 'undefined' && this.previousSelectedCol < tds.length - 1) {
        tds[this.previousSelectedCol + 1].className = '';
      }

      tds[this.selectedCol + 1].className = 'positive';

    }

    this.previousSelectedCol = this.selectedCol;
  },

  _reNumberAttributes: function(listAttributes) {
    for (let i = 0; i < listAttributes.length; i++) {
      let attribute = listAttributes[i];
      attribute.orderNum = i + 1;
      attribute.firstPosition = undefined;
      attribute.lastPosition = undefined;
    }

    if (listAttributes.length > 0) {
      listAttributes[0].firstPosition = true;
      listAttributes[listAttributes.length - 1].lastPosition = true;
    }

  },

  _attributeRight: function(listAttributes, index) {
    let posLeft = index;
    let posRight = index + 1;
    let newAttributes = [];
    let newPrevRowsTypes = [];
    let newPrevRowsValues = [];
    let nCol;
    for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
      newPrevRowsValues[nRow] = [];
    }

    for (nCol = 0; nCol < posLeft; nCol++) {
      newAttributes[nCol] = listAttributes[nCol];
      newPrevRowsTypes[nCol] = this._prevRowsTypes[nCol];
      for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
        newPrevRowsValues[nRow][nCol] =  this._prevRowsValues[nRow][nCol];
      }
    }

    newAttributes[posLeft] = listAttributes[posRight];
    newPrevRowsTypes[posLeft] = this._prevRowsTypes[posRight];
    for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
      newPrevRowsValues[nRow][posLeft] =  this._prevRowsValues[nRow][posRight];
    }

    newAttributes[posRight] = listAttributes[posLeft];
    newPrevRowsTypes[posRight] = this._prevRowsTypes[posLeft];
    for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
      newPrevRowsValues[nRow][posRight] =  this._prevRowsValues[nRow][posLeft];
    }

    for (nCol += 2; nCol < listAttributes.length; nCol++) {
      newAttributes[nCol] = listAttributes[nCol];
      newPrevRowsTypes[nCol] = this._prevRowsTypes[nCol];
      for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
        newPrevRowsValues[nRow][nCol] =  this._prevRowsValues[nRow][nCol];
      }
    }

    this._reNumberAttributes(newAttributes);
    this._prevRowsTypes = newPrevRowsTypes;
    this._prevRowsValues = newPrevRowsValues;
    if (this.selectedCol === posLeft) {
      Ember.set(this, 'selectedCol', posRight);
    } else {
      if (this.selectedCol === posRight) {
        Ember.set(this, 'selectedCol', posLeft);
      }
    }

    return newAttributes;
  },

  _attributeDelete: function(listAttributes, index) {
    let newAttributes = [];
    let i = 0;
    for (; i < index; i++) {
      newAttributes.push(listAttributes[i]);
    }

    i++;
    for (; i < listAttributes.length; i++) {
      newAttributes.push(listAttributes[i]);
    }

    this._reNumberAttributes(newAttributes);
    if (this.selectedCol === index) {
      Ember.set(this, 'selectedCol', undefined);
    }

    return newAttributes;
  },

  actions: {

    attributeShow(index) {
      let attribute = this.listAttributes[index];
      let editControl = this.editControl;

      //       let type;
      //       switch (attribute.type) {
      //         case 'bool': type = 'boolean'; break;
      //         default: type = attribute.type;
      //       }
      Ember.set(editControl, 'name', attribute.name);
      Ember.set(editControl, 'type', attribute.type);
      Ember.set(editControl, 'isNull', attribute.notNull);
      Ember.set(editControl, 'defaultValue', attribute.defaultValue);
      Ember.set(this, 'selectedCol', index);
      this._setDOMSelectedColumn();  /*To be removed after handelbar tuning*/
    },

    attributeCreate() {
      let editControl = this.editControl;
      let listAttributes = this.listAttributes;
      let editType = editControl.type === undefined ? 'string' : editControl.type;
      let editName = this.selectedCol === undefined || editControl.name === undefined ? 'NewAttribute_' : editControl.name.trim() + '_';
      Ember.set(this, 'selectedCol', undefined);
      let newAttributes = [];
      let maxIndex = 1;
      for (let i = 0; i < listAttributes.length; i++) {
        let attribute = listAttributes[i];
        newAttributes.push(attribute);
        if (attribute.name.substr(0, editName.length) === editName) {
          let copy = parseInt(attribute.name.substr(editName.length));
          if (!isNaN(copy)) {
            maxIndex = copy + 1;
          }
        }
      }

      editName += maxIndex;
      Ember.set(editControl, 'name', editName);
      Ember.set(editControl, 'type', editType);
      newAttributes.push({ name: editName, type: editType });

      Ember.set(this, 'selectedCol', newAttributes.length - 1);
      Ember.set(this, 'listAttributes', newAttributes);
    },

    attributeDelete(index) {
      let newAttributes = [];
      let listAttributes = this.listAttributes;
      let newPrevRowsTypes = [];
      let newPrevRowsValues = [];
      let nCol;

      for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
        newPrevRowsValues[nRow] = [];
      }

      for (nCol = 0; nCol < index; nCol++) {
        newAttributes.push(listAttributes[nCol]);
        newPrevRowsTypes[nCol] = this._prevRowsTypes[nCol];
        for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
          newPrevRowsValues[nRow][nCol] =  this._prevRowsValues[nRow][nCol];
        }
      }

      let newNCol = nCol;
      nCol = nCol + 1;
      for (; nCol < listAttributes.length; nCol++) {
        newAttributes.push(listAttributes[nCol]);
        newPrevRowsTypes[newNCol] = this._prevRowsTypes[nCol];
        for (let nRow = 0; nRow < this._prevRowsValues.length; nRow++) {
          newPrevRowsValues[nRow][newNCol] =  this._prevRowsValues[nRow][nCol];
          newNCol++;
        }
      }

      this._prevRowsTypes = newPrevRowsTypes;
      this._prevRowsValues = newPrevRowsValues;
      this._reNumberAttributes(newAttributes);
      if (this.selectedCol === index) {
        Ember.set(this, 'selectedCol', undefined);
      } else {
        if (this.selectedCol > index) {
          this.selectedCol -= 1;
        }
      }

      Ember.set(this, 'listAttributes', newAttributes);
    },

    attributeLeft(index) {
      let newAttributes = this._attributeRight(this.listAttributes, index - 1);
      Ember.set(this, 'listAttributes', newAttributes);
    },

    attributeRight(index) {
      let newAttributes = this._attributeRight(this.listAttributes, index);
      Ember.set(this, 'listAttributes', newAttributes);
    },

    showForm: function() {
    }

  }

});
