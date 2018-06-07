import Ember from 'ember';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';

export default Ember.Route.extend({

  objectlistviewEventsService: Ember.inject.service('objectlistview-events'),

  model: function(arg) {
    let store = this.get('store');

    // Get attribute view.
    var recordsView = store.peekAll('fd-dev-view');
    let data = recordsView.findBy('id', arg.id);

    // Get current class.
    let devClass = data.get('class');

    // Get array attributes current class.
    let attributes = Ember.A(devClass.get('attributes').canonicalState);
    let recordsDevClass = store.peekAll('fd-dev-class');

    // Get array association for current class.
    var recordsAssociation = store.peekAll('fd-dev-association');
    let associationData = recordsAssociation.filterBy('endClass.id', devClass.get('id'));

    // Get array aggregation for current class.
    var recordsAggregation = store.peekAll('fd-dev-aggregation');
    let aggregationData = recordsAggregation.filterBy('startClass.id', devClass.get('id'));

    // Get aggregation array for parent current class.
    var recordsInheritance = store.peekAll('fd-dev-inheritance');
    let inheritanceData = recordsInheritance.filterBy('child.id', devClass.get('id'));

    while (inheritanceData.length > 0) {
      let parentID = null;
      for (let i = 0; i < inheritanceData.length; i++) {
        let inheritance = inheritanceData[i];
        let parentStereotype = inheritance.get('parent.stereotype');
        if (Ember.isNone(parentStereotype)) {
          parentID = inheritance.get('parent.id');
          attributes.pushObjects(recordsDevClass.findBy('id', parentID).get('attributes').canonicalState);
          associationData.pushObjects(recordsAssociation.filterBy('endClass.id', parentID));
          aggregationData.pushObjects(recordsAggregation.filterBy('startClass.id', parentID));
        } //TODO else if (parentStereotype === '«external»') {}
      }

      if (!Ember.isNone(parentID)) {
        inheritanceData = recordsInheritance.filterBy('child.id', parentID);
      } else {
        inheritanceData = Ember.A();
      }
    }

    // Set attributes tree.
    let tree = Ember.A();

    attributes.forEach((attribute) => {
      tree.pushObject(FdViewAttributesTree.create({
        name: attribute.getRecord().get('name'),
        type: 'property'
      }));
    });

    associationData.forEach((master) => {
      let startClass = master.get('startClass');
      let masterName = startClass.get('name');
      tree.pushObject(FdViewAttributesTree.create({
        name: masterName,
        type: 'master'
      }));
    });

    aggregationData.forEach((detail) => {
      let endClass = detail.get('endClass');
      let detailName = endClass.get('name');
      let detailViews = endClass.get('views');
      let detailViewsItems = detailViews.canonicalState.map((view) => view.getRecord().get('name'));
      let definition = data.get('data.definition');
      definition.forEach((attribute) => {
        if (detailName === attribute.name) {
          // Add aggregation array in model.
          attribute.detailViewNameItems = detailViewsItems;
        }
      });

      tree.pushObject(FdViewAttributesTree.create({
        name: detailName,
        type: 'detail'
      }));
    });

    data.set('data.attributesTree', tree);
    this.get('objectlistviewEventsService').setLoadingState('');

    return data;
  }
});
