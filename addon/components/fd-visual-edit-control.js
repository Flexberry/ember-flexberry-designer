import Ember from 'ember';

import FdDataTypes from '../utils/fd-datatypes';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformTab from '../objects/fd-editform-tab';

export default Ember.Component.extend({
  /**
    Contains stage's enums.

    @property enums
    @type Ember.A()
    @default undefined
  */
  enums: undefined,

  /**
    Contains stage's typemap.

    @property typemap
    @type Ember.A()
    @default undefined
  */
  typemap: undefined,

  /**
    Contains stage's types.

    @property fbtypes
    @type Ember.A()
    @default undefined
  */
  fbtypes: undefined,

  /**
    @private
    @property _selectedIsControl
    @readOnly
    @type Boolean
  */
  _selectedIsControl: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformControl;
  }).readOnly(),

  /**
    @private
    @property _selectedIsGroup
    @readOnly
    @type Boolean
  */
  _selectedIsGroup: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformGroup;
  }).readOnly(),

  /**
    @private
    @property _selectedIsTab
    @readOnly
    @type Boolean
  */
  _selectedIsTab: Ember.computed('selectedControl', function() {
    return this.get('selectedControl') instanceof FdEditformTab;
  }).readOnly(),

  /**
    The selected control.

    @property selectedControl
    @type FdEditformControl|FdEditformGroup|FdEditformTab
  */
  selectedControl: undefined,

  /**
    Observer, checks if selected control changed and changes selectedType.

    @method selectedControlChanged
  */
  selectedControlChanged: Ember.observer('selectedControl', function() {
    let selectedControl = this.get('selectedControl');
    this.set('selectedType', this.getTranslationString(selectedControl.type));
  }),

  _dataTypes: FdDataTypes.create(),

  _readonly: Ember.computed.empty('selectedControl'),

  /**
    All types with properties.

    @property types
    @type Ember.A()
    @default undefined
  */
  types: undefined,

  /**
    Strings shown to user.

    @property typesAsStrings
    @type Ember.A()
  */
  typesAsStrings: undefined,

  /**
    Dictionary: type to locale key.

    @property typeToString
    @type Object
  */
  typeToString: {
    string: 'components.fd-visual-control.typeName.stringControlType',
    bool: 'components.fd-visual-control.typeName.boolControlType',
    char: 'components.fd-visual-control.typeName.charControlType',
    guid: 'components.fd-visual-control.typeName.guidControlType',
    decimal: 'components.fd-visual-control.typeName.decimalControlType',
    double: 'components.fd-visual-control.typeName.doubleControlType',
    float: 'components.fd-visual-control.typeName.floatControlType',
    sbyte: 'components.fd-visual-control.typeName.sbyteControlType',
    short: 'components.fd-visual-control.typeName.shortControlType',
    byte: 'components.fd-visual-control.typeName.byteControlType',
    int: 'components.fd-visual-control.typeName.intControlType',
    long: 'components.fd-visual-control.typeName.longControlType',
    uint: 'components.fd-visual-control.typeName.uintControlType',
    ushort: 'components.fd-visual-control.typeName.ushortControlType',
    ulong: 'components.fd-visual-control.typeName.ulongControlType',
    date: 'components.fd-visual-control.typeName.dateControlType', //?
    time: 'components.fd-visual-control.typeName.dateControlType', //?
    file: 'components.fd-visual-control.typeName.fileControlType',
    dropdown: 'components.fd-visual-control.typeName.drowdownControlType',
    lookup: 'components.fd-visual-control.typeName.lookupControlType',
  },

  /**
    Gets translated string for type.

    @method getTranslationString
    @return String
  */
  getTranslationString(type) {
    let userString;
    let tts = this.get('typeToString');
    userString = tts[type];

    if (userString === undefined) {
      for (let ts in tts) {
        if (type.toLowerCase().indexOf(ts) !== -1) {
          userString = tts[ts];
          break;
        }
      }
    }

    if (userString === undefined) {
      userString = type;
    }

    return userString;
  },

  /**
    Gets types array from stage.

    @method getAllTypes
  */
  getAllTypes() {
    let typemap = this.get('typemap');
    let enums = this.get('enums');
    let fbtypes = this.get('fbtypes');
    let ret = Ember.A();
    let retStrings = Ember.A();

    for (let type of typemap) {
      let obj = {};
      obj.type = type.name;
      if (type.name.indexOf('null') !== -1 || type.name.indexOf('Null') !== -1) {
        obj.nullable = true;
      } else {
        obj.nullable = false;
      }

      obj.userString = this.getTranslationString(obj.type);
      retStrings.push(obj.userString);
      ret.push(obj);
    }

    for (let sEnum of enums.content) {
      let obj = {};
      obj.type = sEnum._data.nameStr;
      if (obj.type.indexOf('null') !== -1 || obj.type.indexOf('Null') !== -1) {
        obj.nullable = true;
      } else {
        obj.nullable = false;
      }

      obj.userString = this.getTranslationString(obj.type);
      retStrings.push(obj.userString);
      ret.push(obj);
    }

    for (let type of fbtypes.content) {
      let obj = {};
      obj.type = type._data.caption;
      if (obj.type.indexOf('null') !== -1 || obj.type.indexOf('Null') !== -1) {
        obj.nullable = true;
      } else {
        obj.nullable = false;
      }

      obj.userString = this.getTranslationString(obj.type);
      retStrings.push(obj.userString);
      ret.push(obj);
    }

    if (ret.length !== 0) {
      this.set('types', ret);
      this.set('typesAsStrings', retStrings);
    } else {
      this.set('types', [
        {
          nullable: false,
          type: 'bool',
          userString: 'components.fd-visual-control.typeName.boolControlType'
        },
        {
          nullable: false,
          type: 'int',
          userString: 'components.fd-visual-control.typeName.boolintControlType'
        },
        {
          nullable: false,
          type: 'string',
          userString: 'components.fd-visual-control.typeName.dateControlType'
        }
      ]);
      this.set('typesAsStrings', [
        'components.fd-visual-control.typeName.stringControlType',
        'components.fd-visual-control.typeName.boolControlType',
        'components.fd-visual-control.typeName.intControlType',
        'components.fd-visual-control.typeName.dateControlType'
      ]);
    }

  },

  /**
    Contains selected type locale key.

    @property selectedType
    @type String
  */
  selectedType: undefined,

  allowNull: Ember.computed('selectedControl.notNull', {
    get() {
      return !this.get('selectedControl.notNull');
    },

    set(key, value) {
      return this.set('selectedControl.notNull', !value);
    },
  }),

  defaultValueControl: Ember.computed('selectedControl.type', function() {
    switch (this.get('selectedControl.type')) {
      default:
        return 'flexberry-textbox';
    }
  }),

  /**
    Initialization hook.

    @method init
  */
  init() {
    this._super(...arguments);
    this.getAllTypes();
  },

  actions: {
    /**
      Action, triggered by dropdown selection changed.

      @method actions.onDropDownSelectionChanged
    */
    onDropDownSelectionChanged() {
      let selectedType = this.get('selectedType');
      let tts = this.get('typeToString');
      for (let tt in tts) {
        if (tts[tt] === selectedType) {
          this.set('selectedControl.type', tt);
          break;
        }
      }
    },
  }
});
