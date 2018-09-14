import Ember from 'ember';
import BusinessDataObjectEvents from 'ember-flexberry-designer/enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';
import FdFormUnsavedData from '../mixins/fd-form-unsaved-data';

export default Ember.Controller.extend(FdFormUnsavedData, {
  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  /**
    Name of current <<typedef>> class.
    @property className
    @type String
    @default undefined
  */
  className: undefined,

  /**
    Property, which contains C# string label.
    @property CSStrLabel
    @type String
    @default `C#`
  */
  CSStrLabel: 'C#',

  /**
    Property, which contains C# string.
    @property CSStrText
    @type String
    @default undefined
  */
  CSStrText: undefined,

  /**
    Ember.observer, watching string `CSStrText` and saving changes to model property.
    @method CSStr
  */
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

  /**
    Property, which contains SQL string label.
    @property SQLStrLabel
    @type String
    @default `SQL`
  */
  SQLStrLabel: 'SQL',

  /**
    Property, which contains SQL string.
    @property SQLStrText
    @type String
    @default undefined
  */
  SQLStrText: undefined,

  /**
    Ember.observer, watching string `SQLStrText` and saving changes to model property.
    @method SQLStr
  */
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

  /**
    Property, which contains Oracle string label.
    @property oracleStrLabel
    @type String
    @default `Oracle`
  */
  oracleStrLabel: 'Oracle',

  /**
    Property, which contains Oracle string.
    @property oracleStrText
    @type String
    @default undefined
  */
  oracleStrText: undefined,

  /**
    Ember.observer, watching string `oracleStrText` and saving changes to model property.
    @method oracleStr
  */
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

  /**
    Property, which contains Postgre string label.
    @property postgreStrLabel
    @type String
    @default `Postgre`
  */
  postgreStrLabel: 'Postgre',

  /**
    Property, which contains Postgre string.
    @property postgreStrText
    @type String
    @default undefined
  */
  postgreStrText: undefined,

  /**
    Ember.observer, watching string `postgreStrText` and saving changes to model property.
    @method postgreStr
  */
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

  /**
    Deserializes XML string typemap to array of objects
    @method deserialize
  */
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

  /**
    Serializes typemap (array of objects) to XML string.
    @method serialize
  */
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
      this.get('appState').loading();
      this.model.save()
      .catch((error) => {
        this.get('appState').reset();
        this.set('error', error);
      })
      .finally(() => {
        this.get('appState').reset();
      });
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
