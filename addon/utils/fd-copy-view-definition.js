import Ember from 'ember';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';

/**
  Copy array definition in view.
*/
let copyViewDefinition = function(definition) {
  let copyDefinition = Ember.A();
  definition.forEach((item) => {
    if (item instanceof FdViewAttributesDetail) {
      copyDefinition.pushObject(Ember.$.extend(true, FdViewAttributesDetail.create(), item));
    } else if (item instanceof FdViewAttributesMaster) {
      copyDefinition.pushObject(Ember.$.extend(true, FdViewAttributesMaster.create(), item));
    } else {
      copyDefinition.pushObject(Ember.$.extend(true, FdViewAttributesProperty.create(), item));
    }
  });

  return copyDefinition;
};

export {
  copyViewDefinition
};
