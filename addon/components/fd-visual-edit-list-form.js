import Ember from 'ember';
import layout from '../templates/components/fd-visual-edit-list-form';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Component.extend({
  layout,

  store: Ember.inject.service('store'),

  formId: null,

  selectedCol: undefined,

  previousSelectedCol: undefined,

  selectedCols:  Ember.computed( 'selectedCol', 'model.listform.listAttributes', function() {
    let ret = [];
    for (let i=0; i < this.model.listform.listAttributes.length; i++) {
      ret[i] = (typeof (this.selectedCol) !== 'undefined' && this.selectedCol === i);
    }
    return ret;
  }),

  attributes:  Ember.computed('model.listform.listAttributes', function() {
    let ret = Ember.A();
    for (let i=0; i < this.model.listform.listAttributes.length; i++) {
      let obj = Ember.Object.create(this.model.listform.listAttributes[i]);
      ret.addObject(obj);
    }
    return ret;
  }),


  init: function() {
    this._super(...arguments);
  },

  didUpdateAttrs: function() {
    this._super(...arguments);
  },


  willUpdate: function() {
    this._super(...arguments);
  },

  willRender: function() {
    this._super(...arguments);
  },


  didRender: function() {
    this._super(...arguments);
    this._setDOMSelectedColumn();
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

  _reNumberAttributes(listAttributes) {
    for (let i=0; i < listAttributes.length; i++) {
      let attribute = listAttributes[i];
      attribute.orderNum = i+1;
      attribute.firstPosition = undefined;
      attribute.lastPosition = undefined;
    }
    listAttributes[0].firstPosition = true;
    listAttributes[listAttributes.length - 1].lastPosition = true;
  },

  _attributeRight(index) {
    let posLeft = index;
    let posRight = index + 1;
    let listAttributes = this.model.listform.listAttributes;
    let newAttributes = Ember.A();
    for (let i = 0; i < index; i++) {
      newAttributes.addObject(listAttributes[i]);
    }
    let newLeftAttr = listAttributes[posRight];
    let newRightAttr = listAttributes[index];
    newAttributes.addObject(newLeftAttr);
    newAttributes.addObject(newRightAttr);
    for (let i=index+2; i < listAttributes.length; i++) {
      newAttributes.addObject(listAttributes[i]);
    }

    this._reNumberAttributes(newAttributes);
    Ember.set(this.model.listform, 'listAttributes', newAttributes);
    if (this.selectedCol === posLeft) {
      this.selectedCol = posRight;
    } else {
      if (this.selectedCol === posRight)
        this.selectedCol = posLeft;
    }
  },

  //To be removed after handelbar tuning
  _setDOMSelectedColumn: function() {
    if (typeof this.selectedCol === 'undefined') {
      return;
    }
    let tr =  Ember.$('#attributeList');
    let tds = tr.find('td');
    if (typeof this.previousSelectedCol !== 'undefined') {
      tds[this.previousSelectedCol].className = '';
    }
    tds[this.selectedCol].className = 'active';
    this.previousSelectedCol = this.selectedCol;
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

    attributeLeft(index) {
      this._attributeRight(index - 1);
    },

    attributeRight(index) {
      this._attributeRight(index);
    },

    attributeDelete(index) {
      alert('Delete ' + index);
    },

    attributeCreate() {
      alert('Create ');
    },

    showForm: function() {
      let store = this.get('store');
      let select = Ember.$('#selectForm').get(0);
      let option = select.options[select.selectedIndex];
      let formId = option.value;
      let formName = option.innerText;
      let _this = this;
      let p1 = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«listform»');
      let p2 = new Query.SimplePredicate('formViews.view.class.id', FilterOperator.Eq, formId);

      let builder = new  Builder(store, 'fd-dev-class').
      select('id,name,description,stereotype,formViews,formViews.view,formViews.view.class,formViews.view.class.id').
      where(p1);
      let promise = store.query('fd-dev-class', builder.build());
      promise.then(
        function(records) {
          let n = records.get('length');
          for (let i = 0; i < n; i++) {
            let record = records.nextObject(i);
            let parentId = record.get('formViews').nextObject(0).get('view.class.id');
            if (parentId === formId) {
              let nameL = record.get('name');
              let builder = new  Builder(store, 'fd-dev-view').
              select('id,name,description,definition').
              where('name', FilterOperator.Eq, nameL);
              store.query('fd-dev-view', builder.build()).then(
                function(records) {
                  let record = records.nextObject(0);
                  let definition = record.get('definition');
                  this.fieldList = _this._parseDefinition(definition);
                },
                function(data) {
                  alert(data);
                }
              );
              break;
            }
          }
        },
        function(data) {
          alert(data);
        }
      );



    }

  }


});
