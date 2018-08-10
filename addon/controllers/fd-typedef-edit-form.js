import Ember from 'ember';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

export default Ember.Controller.extend({
  CSStrLabel: 'C#',
  CSStr: Ember.computed('className', {
    get(key) {
      let m = this.model;
      if (!Ember.isEmpty(m.get('typeMapCSStr'))) {
        return this.deserialize(m.get('typeMapCSStr')).findBy('name', this.get('className')).value;
      }
    },
    set(key, value) {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapCSStr'));
      let objToEdit = deserialized.findBy('name', this.get('className'));
      objToEdit.value = value;
      m.set('typeMapCSStr', this.serialize(deserialized));
    }

  }),
  SQLStrLabel: 'SQL',
  SQLStr: Ember.computed('className', {
    get(key) {
      let m = this.model;
      if (!Ember.isEmpty(m.get('typeMapSQLStr'))) {
        return this.deserialize(m.get('typeMapSQLStr')).findBy('name', this.get('className')).value;
      }
    },
    set(key, value) {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapSQLStr'));
      let objToEdit = deserialized.findBy('name', this.get('className'));
      objToEdit.value = value;
      m.set('typeMapSQLStr', this.serialize(deserialized));
    }

  }),
  oracleStrLabel: 'Oracle',
  oracleStr: Ember.computed('className', {
    get(key) {
      let m = this.model;
      if (!Ember.isEmpty(m.get('typeMapOracleStr'))) {
        return this.deserialize(m.get('typeMapOracleStr')).findBy('name', this.get('className')).value;
      }
    },
    set(key, value) {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapOracleStr')).findBy('name', this.get('className'));
      let objToEdit = deserialized.findBy('name', this.get('className'));
      objToEdit.value = value;
      m.set('typeMapOracleStr', this.serialize(deserialized));
    }

  }),
  postgreStrLabel: 'Postgre',
  postgreStr: Ember.computed('className', {
    get(key) {
      let m = this.model;
      if (!Ember.isEmpty(m.get('typeMapPostgreStr'))) {
        return this.deserialize(m.get('typeMapPostgreStr')).findBy('name', this.get('className')).value;
      }
    },
    set(key, value) {
      let m = this.model;
      let deserialized = this.deserialize(m.get('typeMapPostgreStr')).findBy('name', this.get('className'));
      let objToEdit = deserialized.findBy('name', this.get('className'));
      objToEdit.value = value;
      m.set('typeMapPostgreStr', this.serialize(deserialized));
    }
  }),
  className: undefined,
  classId: undefined,

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
