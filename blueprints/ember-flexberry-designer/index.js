/* globals module */
module.exports = {
  afterInstall: function() {
    var _this = this;
    return _this.addAddonsToProject({
      packages: [
        { name: 'ember-cli-jstree', target: '1.0.9' },
        { name: 'ember-flexberry', target: '0.12.3' },
        { name: 'ember-promise-helpers', target: '1.0.3' }
      ]
    }).then(function () {
      return _this.addPackagesToProject([
        { name: 'jointjs', target: '^2.1.2' }
      ]);
    });
  },

  normalizeEntityName: function() {}
};
