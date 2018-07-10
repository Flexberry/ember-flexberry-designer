import Ember from 'ember';

import FdListformColumn from '../objects/fd-listform-column';

export default Ember.Controller.extend({
  queryParams: ['form', 'class'],

  formClass: Ember.computed.alias('model.form'),

  view: Ember.computed.alias('model.form.formViews.firstObject.view'),

  dataObject: Ember.computed.alias('model.form.formViews.firstObject.view.class'),

  /**
    The selected column.

    @property selectedColumn
    @type FdListformColumn
  */
  selectedColumn: undefined,

  /**
    Columns of the table in the list form.

    @property columns
    @type FdListformColumn[]
    @readOnly
  */
  columns: Ember.computed('view.definition', function() {
    let columns = Ember.A();
    let definition = this.get('view.definition');
    let length = definition.get('length');
    for (let i = 0; i < length; i++) {
      columns.pushObject(FdListformColumn.create({
        propertyDefinition: definition.objectAt(i),
      }));
    }

    return columns;
  }).readOnly(),

  actions: {
    /**
      Set the selected column.

      @method actions.selectColumn
      @param {FdListformColumn} column
    */
    selectColumn(column) {
      this.set('selectedColumn', this.get('selectedColumn') === column ? undefined : column);
    },

    addAttribute() {
      this.get('attributes').pushObject({ name: 'Property name' });
    },

    moveAttribute(from, to) {
      let attributes = this.get('attributes');
      let attribute = attributes.objectAt(from);

      attributes.removeAt(from);
      attributes.insertAt(to, attribute);

      if (this.get('indexSelectedAttribute') === from) {
        this.set('indexSelectedAttribute', to);
      } else if (this.get('indexSelectedAttribute') === to) {
        this.set('indexSelectedAttribute', from);
      }
    },

    removeAttribute(index) {
      if (this.get('indexSelectedAttribute') === index) {
        this.set('indexSelectedAttribute', undefined);
      } else if (index < this.get('indexSelectedAttribute')) {
        this.decrementProperty('indexSelectedAttribute');
      }

      this.get('attributes').removeAt(index);
    },

    save() {
      let attributes = [];
      let definition = Ember.A(this.get('view.definition'));
      this.get('attributes').forEach((attribute) => {
        let property = definition.findBy('propertyName', attribute.propertyName);
        if (property) {
          property.caption = attribute.name;
        } else {
          let attributeName = this._translate(attribute.name);
          let classAttribute = this.get('dataObject.attributes').findBy('name', attributeName);
          if (!classAttribute) {
            classAttribute = this.get('dataObject.attributes').createRecord({ name: attributeName });
          }

          attribute.classAttribute = classAttribute;
          property = { caption: attribute.name };
          property.propertyName = attributeName;
          property.visible = 'True';
          property.isMaster = 'False';
          property.lookupType = '';
          property.masterPropertyName = '';
          property.masterCustomizationString = '';
        }

        attribute.classAttribute.set('type', attribute.type);
        attribute.classAttribute.set('notNull', attribute.notNull);
        attribute.classAttribute.set('defaultValue', attribute.defaultValue);
        attributes.push(property);
      });

      definition.filterBy('visible', 'False').forEach(attributes.push);
      this.set('view.definition', attributes);

      let formName = this.get('formClass.name');
      if (this.get('formClass.isNew')) {
        this.set('formClass.caption', formName);
        this.set('formClass.stereotype', '«listform»');
        this.set('view.name', `${formName}ViewL`);
        this.set('formClass.formViews.firstObject.name', 'listview');
      }

      if (this.get('dataObject.isNew')) {
        this.set('dataObject.name', `${formName}Object`);
        this.set('dataObject.caption', `${formName}Object`);
      }

      this.get('dataObject').save().then(() => {
        let promises = this.get('attributes').map(a => a.classAttribute.save());
        Ember.RSVP.all(promises).then(() => {
          this.get('view').save().then(() => {
            this.get('formClass').save().then(() => {
              this.get('formClass.formViews.firstObject').save().then(() => {
                this.set('class', undefined);
                this.set('form', this.get('formClass.id'));
              });
            });
          });
        });
      });
    },

    close() {
      this.transitionToRoute('fd-appstruct-form');
    },
  },

  _translate(propertyName) {
    return propertyName;
  },
});
