import DS from 'ember-data';
import model from 'ember-flexberry-data/models/model';

/**
  Model to work with visual edit controller.

  @class NewPlatformFlexberryFlexberryDesignerVisualEditControl
  @extends model
*/
let Model = model.extend({
  isSelected: DS.attr('boolean'),
  prototypeBy: DS.attr('string'),
  name: DS.attr('string'),
  value: DS.attr('string'),
  type: DS.attr('string'),
  typeName: DS.attr('string'),
  controlType: DS.attr('string'),
  isNull: DS.attr('boolean'),
  defaultValue: DS.attr('string'),
  defaultValueControl: DS.attr('string')
});

export default Model;
