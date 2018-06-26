/**
  @module ember-flexberry-designer
*/

import FdViewAttributesProperty from './fd-view-attributes-property';

/**
  Describes properties on the master view.

  @class FdViewAttributesMaster
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default FdViewAttributesProperty.extend({

  /**
    Item property 'lookupType'.

    @property lookupType
    @type String
  */
  lookupType: 'default',

  /**
    Item property 'masterPropertyName'.

    @property masterPropertyName
    @type String
  */
  masterPropertyName: '',

  /**
    Item property 'masterCustomixationString'.

    @property masterCustomizationString
    @type String
  */
  masterCustomizationString: '',
});
