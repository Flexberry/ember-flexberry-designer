import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([array, value]) {
    if (!array || typeof array.includes !== 'function') {
      return false;
    }
    
    return array.includes(value);
  }
});
