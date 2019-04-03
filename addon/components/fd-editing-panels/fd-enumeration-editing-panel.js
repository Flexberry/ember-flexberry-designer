import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import FdUpdateAttributeValueMixin from '../../mixins/fd-editing-panels/fd-update-attribute-value';
import layout from '../../templates/components/fd-editing-panels/fd-enumeration-editing-panel';

export default Component.extend(FdUpdateAttributeValueMixin, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Table headers.

    @property tableViewAttribute
    @type Array
    @default undefined
  */
  tableViewAttribute: [
    {
      columnCaption: 'components.fd-attribute-table.attribute.name',
      columnProperty: 'name',
      attrPlaceholder: 'components.fd-attribute-table.attribute.name-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.caption',
      columnProperty: 'caption',
      attrPlaceholder: 'components.fd-attribute-table.attribute.caption-placeholder',
    },
    {
      columnCaption: 'components.fd-attribute-table.attribute.description',
      columnProperty: 'description',
      attrPlaceholder: 'components.fd-attribute-table.attribute.description-placeholder',
    },
  ],
});
