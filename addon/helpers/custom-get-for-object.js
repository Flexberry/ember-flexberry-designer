import Helper from '@ember/component/helper';
export default Helper.extend({
  compute([object, key]) {
    return object[key];
  }
});
