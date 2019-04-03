/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed } from '@ember/object';

/**
  Describes one row with controls on the edit form.

  @class FdEditformRow
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    A collection of controls in row.

    @property controls
    @type Any[]
  */
  controls: undefined,

  /**
    Columns count in row.

    @property columnsCount
    @type Number
  */
  columnsCount: computed.readOnly('controls.length'),
});
