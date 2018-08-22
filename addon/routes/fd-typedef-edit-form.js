import Ember from 'ember';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default Ember.Route.extend(FdFormCheckTransitionMixin, {
  modelProjection: 'TypeDefinitionE',
  modelName: 'fd-dev-type-definition',
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  /**
    Name of current <<typedef>> class.
    @property className
    @type String
    @default undefined
  */
  className: undefined,

  /**
    C# XML typemap string of current stage.
    @property typeMapCSStr
    @type String
    @default undefined
  */
  typeMapCSStr: undefined,

  /**
    SQL XML typemap string of current stage.
    @property typeMapSQLStr
    @type String
    @default undefined
  */
  typeMapSQLStr: undefined,

  /**
    Oracle XML typemap string of current stage.
    @property typeMapOracleStr
    @type String
    @default undefined
  */
  typeMapOracleStr: undefined,

  /**
    Postgre XML typemap string of current stage.
    @property typeMapPostgreStr
    @type String
    @default undefined
  */
  typeMapPostgreStr: undefined,

  model(params) {
    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let allStages = store.peekAll('fd-dev-stage');
    let allClasses = store.peekAll('fd-dev-class');
    this.set('className', allClasses.findBy('id', params.id).get('name'));

    let stage = allStages.findBy('id', stageId);

    if (!Ember.isEmpty(stage.get('typeMapCSStr'))) {
      if (!Ember.isEmpty(this.fromXML(stage.get('typeMapCSStr')).findBy('name', this.get('className')))) {
        this.set('typeMapCSStr', this.fromXML(stage.get('typeMapCSStr')).findBy('name', this.get('className')).value);
      }  else {
        this.set('typeMapCSStr', undefined);
      }
    }

    if (!Ember.isEmpty(stage.get('typeMapSQLStr'))) {
      if (!Ember.isEmpty(this.fromXML(stage.get('typeMapSQLStr')).findBy('name', this.get('className')))) {
        this.set('typeMapSQLStr', this.fromXML(stage.get('typeMapSQLStr')).findBy('name', this.get('className')).value);
      } else {
        this.set('typeMapSQLStr', undefined);
      }
    }

    if (!Ember.isEmpty(stage.get('typeMapOracleStr'))) {
      if (!Ember.isEmpty(this.fromXML(stage.get('typeMapOracleStr')).findBy('name', this.get('className')))) {
        this.set('typeMapOracleStr', this.fromXML(stage.get('typeMapOracleStr')).findBy('name', this.get('className')).value);
      } else {
        this.set('typeMapOracleStr', undefined);
      }
    }

    if (!Ember.isEmpty(stage.get('typeMapPostgreStr'))) {
      if (!Ember.isEmpty(this.fromXML(stage.get('typeMapPostgreStr')).findBy('name', this.get('className'))))
      {
        this.set('typeMapPostgreStr', this.fromXML(stage.get('typeMapPostgreStr')).findBy('name', this.get('className')).value);
      } else {
        this.set('typeMapPostgreStr', undefined);
      }
    }

    return stage;
  },

  afterModel(model) {
    this._super(model);
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('className', this.get('className'));
    controller.set('CSStrText', this.get('typeMapCSStr'));
    controller.set('SQLStrText', this.get('typeMapSQLStr'));
    controller.set('oracleStrText', this.get('typeMapOracleStr'));
    controller.set('postgreStrText', this.get('typeMapPostgreStr'));
  },
  /**
    Deserializes XML string typemap to array of objects
    @method fromXML
  */
  fromXML(serialized) {
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
    @method toXML
  */
  toXML(deserialized) {
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
});
