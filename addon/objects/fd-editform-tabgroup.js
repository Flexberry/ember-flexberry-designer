/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed } from '@ember/object';

/**
  Describes a group of tabs on the edit form.

  @class FdEditformTabgroup
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({
  /**
    Specifies the width of the tab group, in percent or in pixels.

    @property width
    @type String
  */
  width: undefined,

  /**
    A collection of tabs in group.

    @property tabs
    @type FdEditformTab[]
  */
  tabs: undefined,

  /**
    One of the tabs, which is now considered active.

    @property activeTab
    @type FdEditformTab
  */
  activeTab: computed.oneWay('tabs.firstObject'),
});
