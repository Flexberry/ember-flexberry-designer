import FlexberryButtonComponent from 'ember-flexberry/components/flexberry-button';
import layout from '../templates/components/fd-button';

export default FlexberryButtonComponent.extend({
  layout,

  tagName: 'button',

  iconClass: 'icon-fd-plus-thin',

  classNames: ['basic circular'],

  buttonType: 'button',

  attributeBindings: ['buttonType:type']
});
