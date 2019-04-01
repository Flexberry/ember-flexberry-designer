/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';

/**
  Describes a group of controls on the edit form.

  @class FdEditformGroup
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    Caption of the group.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    Specifies the width of the group, in percent or in pixels.

    @property width
    @type String
  */
  width: undefined,

  /**
    A collection of rows with controls on the tab.

    @property rows
    @type FdEditformRow[]
  */
  rows: undefined,
});
