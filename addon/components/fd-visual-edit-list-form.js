import Ember from 'ember';
import layout from '../templates/components/fd-visual-edit-list-form';

export default Ember.Component.extend({
  layout,

  errorMessages: null,

  store: Ember.inject.service('store'),

  dataTypes: Ember.inject.service('fd-datatypes'),

  selectedCol: undefined,

  _prevRowsValues: undefined,

  _prevRowsTypes: undefined,

  rowsValues:  Ember.computed(
    'model.listform.listAttributes',
    'model.editControl.type',
    function() {
      let editControlType =this.get('dataTypes').flexberryTypeToFD(this.model.editControl.type);
      if (this.selectedCol === undefined && this._prevRowsValues !== undefined ||
        this.selectedCol !== undefined &&
        typeof this._prevRowsTypes == 'object' &&
        this._prevRowsTypes[this.selectedCol] === editControlType ) {
        return this._prevRowsValues;
      }
      let ret = [];
      this._prevRowsTypes = [];
      let attributes = this.model.listform.listAttributes;
      for (let i = 0; i < 4; i++) {
        ret[i] = [];
        for (let j = 0; j < attributes.length; j++) {
          let attribute = attributes[j];
          this._prevRowsTypes[j] = attribute.type;
//           let value = this.get('dataTypes').randomValue(attribute.type);
          let value;
          if (this.selectedCol !== undefined &&  this.selectedCol !== j && this._prevRowsValues !== undefined) {
            value = this._prevRowsValues[i][j];
          } else {
            value = this.get('dataTypes').randomValue(attribute.type);
          }
//           let value = (this.selectedCol !== undefined &&  this.selectedCol !== j && this._prevRowsValues !== undefined) ?
//             this._prevRowsValues[this.selectedCol] :
//             this.get('dataTypes').randomValue(attribute.type);
          ret[i][j] = value;
        }
      }

      this._prevRowsValues = ret;
      return ret;
  }),


  previousSelectedCol: undefined,

  selectedCols:  Ember.computed('selectedCol', 'model.listform.listAttributes', function() {
    let ret = [];
    for (let i = 0; i < this.model.listform.listAttributes.length; i++) {
      ret[i] = (typeof (this.selectedCol) !== 'undefined' && this.selectedCol === i);
    }

    return ret;
  }),

  attributes:  Ember.computed(
    'model.listform.listAttributes',
    'model.editControl.name',
    'model.editControl.type',
    'model.editControl.defaultValue',
    function() {
    let ret = Ember.A();
    let attributes = this.model.listform.listAttributes;
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      if (this.selectedCol === i) {
        let editControl = this.model.editControl;
        attribute.name = editControl.name;
        attribute.type =this.get('dataTypes').flexberryTypeToFD(editControl.type);
        attribute.defaultValue = editControl.defaultValue;
      }
      let obj = Ember.Object.create(attribute);
      ret.addObject(obj);
    }

    return ret;
  }),

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
      if (typeof this.previousSelectedCol !== 'undefined') {
        tds[this.previousSelectedCol + 1].className = '';
      }

      tds[this.selectedCol + 1].className = 'positive';

    }

    this.previousSelectedCol = this.selectedCol;
  },

  _parseDefinition: function(definition) {
    let ret = [];
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(definition, 'text/xml');
    if (xmlDoc) {
      let view = xmlDoc.getElementsByTagName('View');
      if (view.length > 0) {
        let viewPropertiesList = view[0].getElementsByTagName('ViewPropertiesList');
        if (viewPropertiesList.length > 0) {
          let itemList = viewPropertiesList[0].getElementsByTagName('Item');
          for (let item of itemList) {
            let propertyName = item.getAttribute('PropertyName');
            let caption = item.getAttribute('Caption');
            ret.push({ propertyName:propertyName, caption:caption });
          }
        }
      }
    }

    return ret;
  },

  _reNumberAttributes: function(listAttributes) {
    for (let i = 0; i < listAttributes.length; i++) {
      let attribute = listAttributes[i];
      attribute.orderNum = i + 1;
      attribute.firstPosition = undefined;
      attribute.lastPosition = undefined;
    }

    listAttributes[0].firstPosition = true;
    listAttributes[listAttributes.length - 1].lastPosition = true;
  },

  _attributeRight: function(listAttributes, index) {
    let posLeft = index;
    let posRight = index + 1;
    let newAttributes = [];
    for (let i = 0; i < index; i++) {
      newAttributes.push(listAttributes[i]);
    }

    let newLeftAttr = listAttributes[posRight];
    let newRightAttr = listAttributes[index];
    newAttributes.push(newLeftAttr);
    newAttributes.push(newRightAttr);
    for (let i = index + 2; i < listAttributes.length; i++) {
      newAttributes.push(listAttributes[i]);
    }

    this._reNumberAttributes(newAttributes);
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

  _attributeCreate: function(listAttributes, attribute) {
    let newAttributes = [];
    for (let i = 0; i < listAttributes.length; i++) {
      newAttributes.push(listAttributes[i]);
    }

    newAttributes.push(attribute);
    this._reNumberAttributes(newAttributes);
    return newAttributes;
  },

  actions: {

    attributeShow(index) {
      let attribute = this.model.listform.listAttributes[index];
      let editControl = this.model.editControl;
      let type;
      switch (attribute.type) {
        case 'bool': type = 'boolean'; break;
        default: type = attribute.type;
      }
      Ember.set(editControl, 'name', attribute.name);
      Ember.set(editControl, 'type', type);
      Ember.set(editControl, 'isNull', attribute.notNull);
      Ember.set(editControl, 'defaultValue', attribute.defaultValue);
      Ember.set(this, 'selectedCol', index);
      this._setDOMSelectedColumn();  /*To be removed after handelbar tuning*/
    },

    attributeCreate() {
      let attribute = {
        name: '',
        type: 'string',
        notNull: false,
        defaultValue: ''
      };
      let newAttributes = this._attributeCreate(this.model.listform.listAttributes, attribute);
      Ember.set(this, 'selectedCol', newAttributes.length - 1);
      Ember.set(this.model.listform, 'listAttributes', newAttributes);
    },

    attributeLeft(index) {
      let newAttributes = this._attributeRight(this.model.listform.listAttributes, index - 1);
      Ember.set(this.model.listform, 'listAttributes', newAttributes);
    },

    attributeRight(index) {
      let newAttributes = this._attributeRight(this.model.listform.listAttributes, index);
      Ember.set(this.model.listform, 'listAttributes', newAttributes);
    },

    attributeDelete(index) {
      let newAttributes = this._attributeDelete(this.model.listform.listAttributes, index);
      Ember.set(this.model.listform, 'listAttributes', newAttributes);
    },

    showForm: function() {
    }

  }

});
