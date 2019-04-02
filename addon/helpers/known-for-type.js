import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { isNone } from '@ember/utils';

export default Helper.extend({
  compute([name]) {
    let component = getOwner(this).lookup(`component:${name}`);

    return !isNone(component);
  }
});
