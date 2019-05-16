import DS from 'ember-data';
import model from 'ember-flexberry-data/models/model';

/**
  Model to work with visual edit form.

  @class NewPlatformFlexberryFlexberryDesignerVisualEditForm
  @extends model
*/
let Model = model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),

  controls: DS.hasMany('fd-visual-edit-control')
});

export default Model;
