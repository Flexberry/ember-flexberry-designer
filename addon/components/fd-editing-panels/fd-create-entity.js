import Component from '@ember/component';
import EmberObject from '@ember/object';
import {inject as service} from '@ember/service';
import FdCreateClassObject from '../../mixins/fd-create-class-object';
import layout from '../../templates/components/fd-editing-panels/fd-create-entity';

export default Component.extend(FdCreateClassObject, {
  layout,

  /**
    Classes data.

    @property model
    @type Object
    @default undefined
  */
  model: undefined,

  /**
    Created element.

    @property createdElement
    @type Object
    @default undefined
  */
  createdElement: undefined,

  actions: {
    /**
      Create class

      @method actions.createClass
    */
    createClass(stereotype) {
      let createdClassObject = this.createClassObject(stereotype);
      this.set('createdElement', createdClassObject);
    }
  }
});
