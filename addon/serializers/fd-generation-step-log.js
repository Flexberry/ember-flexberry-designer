import { Serializer as GenerationStepLogSerializer } from
  '../mixins/regenerated/serializers/fd-generation-step-log';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(GenerationStepLogSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey',

  /**
    Ember can't create models with 'isError' attribute.
  */
  keyForAttribute(attr) {
    return attr === 'thisIsError' ? 'IsError' : this._super(...arguments);
  }
});
