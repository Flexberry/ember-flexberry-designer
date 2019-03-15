/**
  @module ember-flexberry-designer
*/

import Component from '@ember/component';

/**
  This component mimics the `flexberry-lookup` component in the edit form constructor.

  @class FdLookupComponent
  @extends <a href="http://emberjs.com/api/classes/Ember.Component.html">Ember.Component</a>
*/
export default Component.extend({
  /**
    Caption for the lookup form.

    @property caption
    @type String
  */
  caption: undefined,

  /**
    The view on which the table will be render in the lookup form.

    @property view
    @type FdDevViewModel
  */
  view: undefined,

  /**
    See [EmberJS API](https://emberjs.com/api/).

    @property classNames
  */
  classNames: ['flexberry-lookup'],
});
