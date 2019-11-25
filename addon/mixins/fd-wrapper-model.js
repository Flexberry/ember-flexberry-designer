import Mixin from '@ember/object/mixin';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';

export default Mixin.create({

  /**
    Wrap model data.

    @method wrapModel
    @param {Object} model
  */
  wrapModel(model) {
    if (isNone(model)) {
      return null;
    }

    if (isArray(model)) {
      return A(model).map((element) => ({ data: element, active: this.checkSelectObject(element) }));
    } else {
      return { data: model, active: this.checkSelectObject(model) };
    }
  },

  /**
    Check id current object eq 'selectObjectId' from share mixin.

    @method checkSelectObject
    @param {Object} model
  */
  checkSelectObject(model) {
    let selectObjectId = this.get('selectObjectId');
    if (isNone(selectObjectId)) {
      return false;
    }

    return selectObjectId === model.get('id');
  }
});
