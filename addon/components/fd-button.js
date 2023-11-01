import FlexberryButtonComponent from 'ember-flexberry/components/flexberry-button';
import layout from '../templates/components/fd-button';

export default FlexberryButtonComponent.extend({
  layout,

  tagName: 'button',

  iconClass: 'icon-guideline-plus',

  classNames: ['basic'],

  buttonType: 'button',

  attributeBindings: ['buttonType:type']
});
