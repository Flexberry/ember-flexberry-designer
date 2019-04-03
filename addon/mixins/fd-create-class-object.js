import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';
import EmberObject from '@ember/object';

export default Mixin.create({
  /**
    Service for get store.

    @property store
    @type store
  */
  store: service(),

  /**
   Service for get current stage.

   @property fdCurrentProjectContext
   @type FdCurrentProjectContext
   */
  fdCurrentProjectContext: service(),

  /**
    Create and return new class object

     @method createClassObject
     @param {String} stereotype stereotype of created class
  */
  createClassObject(stereotype) {
    let fdCurrentProjectContextService = this.get('fdCurrentProjectContext');
    let currentStage = fdCurrentProjectContextService.getCurrentStageModel();
    let store = this.get('store');
    let newClass = store.createRecord('fd-dev-class', {
      stage: currentStage,
      stereotype: stereotype,
      name: '',
      nameStr: ''
    });

    let newClassObject = EmberObject.create({
      model: newClass
    });

    switch (stereotype) {
      case '«implementation»':
        this.get('model.classes').push({ settings: newClassObject });
        break;
      case '«enumeration»':
        this.get('model.enums').push(newClassObject);
        break;
      case '«typedef»':
        this.get('model.typedefs').push(newClassObject);
        break;
      case '«type»':
        this.get('model.types').push(newClassObject);
        break;
      case '«application»':
        this.get('model.applications').push(newClassObject);
        break;
      case '«businessserver»':
        this.get('model.bs').push(newClassObject);
        break;
      case '«external»':
        this.get('model.externals').push(newClassObject);
        break;
      case '«externalinterface»':
        this.get('model.externalinterface').push(newClassObject);
        break;
      case '«interface»':
        this.get('model.interfaces').push(newClassObject);
        break;
      case '«userform»':
        this.get('model.userforms').push(newClassObject);
        break;
    }

    return newClassObject;
  }
});
