import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([strindValue, lacalePath]) {
    let locale = this.get('i18n').t(`${lacalePath}`).toString();

    return strindValue === locale;
  }
});
