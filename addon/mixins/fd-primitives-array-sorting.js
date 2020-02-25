/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';

export default Mixin.create({
  sortingByTypePartition(primitives) {
    let partitions = primitives.filterBy('primitive.$type', "STORMCASE.UML.ad.Partition, UMLAD");
    partitions.forEach((partition) => {
        primitives.removeObject(partition);
        primitives.insertAt(0, partition);
    });

    return primitives;
  }  
});
