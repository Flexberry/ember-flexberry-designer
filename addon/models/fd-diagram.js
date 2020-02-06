import { A } from '@ember/array';
import { isBlank } from '@ember/utils';
import { Model as DiagramMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-diagram';
import ObjectInSystemModel from './fd-object-in-system';

let Model = ObjectInSystemModel.extend(DiagramMixin, {
  /**
    Get and parse 'primitivesJsonString' value.

    @method getPrimitives
  */
  getPrimitives() {
    let primitivesJsonString = this.get('primitivesJsonString');

    try {
      let primitivesJsonStringParse = JSON.parse(primitivesJsonString);

      return isBlank(primitivesJsonStringParse) ? A() : primitivesJsonStringParse;
    } catch(e) {
      return A();
    }
  }
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
