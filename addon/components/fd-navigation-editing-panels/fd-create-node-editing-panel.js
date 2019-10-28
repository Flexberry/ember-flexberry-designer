import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import layout from '../../templates/components/fd-navigation-editing-panels/fd-create-node-editing-panel';
import FdAppStructTree from '../../objects/fd-appstruct-tree';

export default Component.extend({
  layout,

  /**
    Node data.

    @property node
    @type Object
    @default undefined
  */
  node: undefined,

  /**
    Forms data.

    @property forms
    @type Object
    @default undefined
  */
  forms: undefined,

  /**
    Array selected values.

    @property selectedValues
    @type Array
    @default A()
  */
  selectedValues: A(),

  /**
    Name values.

    @property nameValue
    @type String
  */
  nameValue: undefined,

  /**
    URL values.

    @property urlValue
    @type String
  */
  urlValue: undefined,

  /**
    Description values.

    @property descriptionValue
    @type String
  */
  descriptionValue: undefined,

  /**
    Table headers for view.

    @property tableViewForForm
    @type Array
  */
  tableViewForForm: computed(() => (
    A([{
      columnCaption: 'components.fd-create-node-editing-panel.name-form',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-create-node-editing-panel.name-form',
    },
    {
      columnCaption: 'components.fd-create-node-editing-panel.name-entity',
      columnProperty: 'formViews.firstObject.view.class.name',
      attrPlaceholder: 'components.fd-create-node-editing-panel.name-entity',
    }])
  )),

  actions: {
    /**
      Create url node.

      @method actions.addUrl
    */
    addUrl() {
      let name = this.get('nameValue');
      let url = this.get('urlValue');
      let description = this.get('descriptionValue');
      let node = new FdAppStructTree({
        text: name,
        type: 'property',
        className: '',
        description: description,
        url: url
      });

      this.get('addSubFormAction')([node], this.get('node'));
    },

    /**
      Create form node.

      @method actions.addForm
    */
    addForm() {
      let selectedValues = this.get('selectedValues');
      let nodes = A();
      selectedValues.forEach((selectedValue) => {
        nodes.pushObject(new FdAppStructTree({
          text: selectedValue.name || selectedValue.nameStr,
          type: 'property',
          className: selectedValue.name || selectedValue.nameStr,
          description: selectedValue.description,
          url: ''
        }));
      });

      this.get('addSubFormAction')(nodes, this.get('node'));
    }
  }
});
