import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['form', 'class'],

  formClass: Ember.computed.alias('model.form'),

  view: Ember.computed.alias('model.form.formViews.firstObject.view'),

  dataObject: Ember.computed.alias('model.form.formViews.firstObject.view.class'),

  attributes: Ember.computed('view.definition', function() {
    let attributes = Ember.A();
    let definition = this.get('view.definition');
    for (let i = 0; i < definition.length; i++) {
      if (definition[i].visible === 'True') {
        let attribute = attributes.pushObject({
          propertyName: definition[i].propertyName,
          name: definition[i].caption || definition[i].propertyName,
        });

        if (definition[i].isMaster === 'True') {
          attribute.type = 'guid';
          attribute.notNull = null;
          attribute.defaultValue = null;
        } else {
          let propertyOwner = this.get('dataObject');
          let propertyOwnerId = propertyOwner.get('id');
          let path = definition[i].propertyName.split('.');
          let attributeName = path.pop();
          for (let i = 0; i < path.length; i++) {
            let relationships = this.get('model.associations').filterBy('endClass.id', propertyOwnerId);
            let relationship = relationships.findBy('startRole', path[i]) || relationships.findBy('startClass.name', path[i]);

            if (!relationship) {
              relationships = this.get('model.aggregations').filterBy('endClass.id', propertyOwnerId);
              relationship = relationships.findBy('startRole', path[i]) || relationships.findBy('startClass.name', path[i]);
            }

            propertyOwnerId = relationship.get('startClass.id');
          }

          if (propertyOwner.get('id') !== propertyOwnerId) {
            propertyOwner = this.get('model.dataObjects').findBy('id', propertyOwnerId);
          }

          let classAttribute = propertyOwner.get('attributes').findBy('name', attributeName);
          attribute.classAttribute = classAttribute;
          attribute.type = classAttribute.get('type');
          attribute.notNull = classAttribute.get('notNull');
          attribute.defaultValue = classAttribute.get('defaultValue');
        }
      }
    }

    return attributes;
  }),

  selectedAttribute: Ember.computed('attributes', 'indexSelectedAttribute', function() {
    let attribute;
    let index = this.get('indexSelectedAttribute');
    if (typeof index === 'number') {
      attribute = this.get('attributes').objectAt(index);
    }

    return attribute;
  }),

  actions: {
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

    selectAttribute(index) {
      this.set('indexSelectedAttribute', index);
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
  },

  _translate(propertyName) {
    return propertyName;
  },
});
