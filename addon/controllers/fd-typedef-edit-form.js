import Ember from 'ember';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

export default Ember.Controller.extend({
  className: undefined,

  CSStrLabel: 'C#',
  CSStrText: undefined,
  CSStr: Ember.observer('CSStrText', function() {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapCSStr'));
      if (Ember.isEmpty(deserialized)) {
        deserialized = [{
          name: this.get('className'),
          value: this.get('CSStrText'),
          assemblydll: ''
        }];
      } else {
        if (Ember.isEmpty(deserialized.findBy('name', this.get('className')))) {
          if (!Ember.isEmpty(this.get('CSStrText'))) {
            deserialized.push({
              name: this.get('className'),
              value: this.get('CSStrText'),
              assemblydll: ''
            });
          }
        } else {
          let objToEdit = deserialized.findBy('name', this.get('className'));
          objToEdit.value = this.get('CSStrText');
        }
      }

      m.set('typeMapCSStr', this.serialize(deserialized));
    }),
  SQLStrLabel: 'SQL',
  SQLStrText: undefined,
  SQLStr: Ember.observer('SQLStrText', function() {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapSQLStr'));
      if (Ember.isEmpty(deserialized)) {
        deserialized = [{
          name: this.get('className'),
          value: this.get('SQLStrText'),
          assemblydll: ''
        }];
      } else {
        if (Ember.isEmpty(deserialized.findBy('name', this.get('className')))) {
          if (!Ember.isEmpty(this.get('SQLStrText'))) {
            deserialized.push({
              name: this.get('className'),
              value: this.get('SQLStrText'),
              assemblydll: ''
            });
          }
        } else {
          let objToEdit = deserialized.findBy('name', this.get('className'));
          objToEdit.value = this.get('SQLStrText');
        }
      }

      m.set('typeMapSQLStr', this.serialize(deserialized));
    }),
  oracleStrLabel: 'Oracle',
  oracleStrText: undefined,
  oracleStr: Ember.observer('oracleStrText', function() {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapOracleStr'));
      if (Ember.isEmpty(deserialized)) {
        deserialized = [{
          name: this.get('className'),
          value: this.get('oracleStrText'),
          assemblydll: ''
        }];
      } else {
        if (Ember.isEmpty(deserialized.findBy('name', this.get('className')))) {
          if (!Ember.isEmpty(this.get('oracleStrText'))) {
            deserialized.push({
              name: this.get('className'),
              value: this.get('oracleStrText'),
              assemblydll: ''
            });
          }
        } else {
          let objToEdit = deserialized.findBy('name', this.get('className'));
          objToEdit.value = this.get('oracleStrText');
        }
      }

      m.set('typeMapOracleStr', this.serialize(deserialized));
    }),
  postgreStrLabel: 'Postgre',
  postgreStrText: undefined,
  postgreStr: Ember.observer('postgreStrText', function() {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapPostgreStr'));
      if (Ember.isEmpty(deserialized)) {
        deserialized = [{
          name: this.get('className'),
          value: this.get('postgreStrText'),
          assemblydll: ''
        }];
      } else {
        if (Ember.isEmpty(deserialized.findBy('name', this.get('className')))) {
          if (!Ember.isEmpty(this.get('postgreStrText'))) {
            deserialized.push({
              name: this.get('className'),
              value: this.get('postgreStrText'),
              assemblydll: ''
            });
          }
        } else {
          let objToEdit = deserialized.findBy('name', this.get('className'));
          objToEdit.value = this.get('postgreStrText');
        }
      }

      m.set('typeMapPostgreStr', this.serialize(deserialized));
    }),

  deserialize(serialized) {
    if (!serialized) {
      return serialized;
    }

    let ret = Ember.A();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(serialized, 'text/xml');

    if (xmlDoc) {
      let items = xmlDoc.getElementsByTagName('TypeMap');
      if (items.length > 0) {
        let arr = items[0].getElementsByTagName('*');
        for (let item of arr) {
          let obj = {
            name: item.tagName
          };

          for (let attr of item.attributes) {
            obj[attr.nodeName] = attr.nodeValue;
          }

          ret.push(obj);
        }
      }
    }

    return ret;
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let serializer = new XMLSerializer();
    let doc = document.implementation.createDocument('', '', null);
    let typeMap = doc.createElement('TypeMap');
    deserialized.forEach(item => {
      let elem = doc.createElement(item.name);
      elem.setAttribute('value', item.value);
      elem.setAttribute('assemblydll', item.assemblydll);
      typeMap.appendChild(elem);
    });
    return serializer.serializeToString(typeMap);
  },

  actions: {
    /**
      Overridden action for button 'Save'.
      @method actions.save
    */
    save() {
      this._setDefaultBusinessServerEvents();
      this._super();
      this.model.save();
    },

    /**
      Overridden action for 'Close' button.

      @method actions.close
    */
    close() {
      history.back();
    },
  },

  /**
    Sets 'businessServerEvents' model property value to default if business server is not present.
    @method _setDefaultBusinessServerEvents
  */
  _setDefaultBusinessServerEvents() {
    if (!this.model.get('businessServerClass') &&
        this.model.get('businessServerEvents') !== BusinessDataObjectEvents.OnAllEvents) {
      this.model.set('businessServerEvents', BusinessDataObjectEvents.OnAllEvents);
    }
  }
});
