import { A } from '@ember/array';
import $ from 'jquery';
import FdViewAttributesProperty from '../objects/fd-view-attributes-property';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';

/**
  Copy array definition in view.
*/
let copyViewDefinition = function(definition) {
  let copyDefinition = A();
  definition.forEach((item) => {
    if (item instanceof FdViewAttributesDetail) {
      copyDefinition.pushObject($.extend(true, FdViewAttributesDetail.create(), item));
    } else if (item instanceof FdViewAttributesMaster) {
      copyDefinition.pushObject($.extend(true, FdViewAttributesMaster.create(), item));
    } else {
      copyDefinition.pushObject($.extend(true, FdViewAttributesProperty.create(), item));
    }
  });

  return copyDefinition;
};

export {
  copyViewDefinition
};
