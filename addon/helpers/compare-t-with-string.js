import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([stringValue, localePath]) {
    let locale = this.get('i18n').t(`${localePath}`).toString();

    return stringValue === locale;
  }
});
