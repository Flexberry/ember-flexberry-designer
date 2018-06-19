import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import FdViewAttributesTree from 'ember-flexberry-designer/objects/fd-view-attributes-tree';

moduleFor('transform:containers-tree', 'Unit | Transform | containers tree');

// Replace this with your real tests.
test('it exists', function(assert) {

  let noteNoteObjectModel1 = Ember.A([
    FdViewAttributesTree.create({
      className: 'ПисьмоWebL',
      description: null,
      text: 'Настройка рассылки писем',
      type: 'property'
    })
  ]);

  let noteNoteObjectModel2 = Ember.A([
    FdViewAttributesTree.create({
      className: 'ЖурналИмпортаWebL',
      description: null,
      text: 'Журнал импорта',
      type: 'property'
    })
  ]);

  let noteObjectModel1 = Ember.A([
    FdViewAttributesTree.create({
      text: 'Настройки',
      type: 'master',
      children: Ember.A(),
      copyChildren: Ember.A()
    }),
    FdViewAttributesTree.create({
      text: 'Рассылка по e-mail',
      type: 'master',
      children: noteNoteObjectModel1,
      copyChildren: noteNoteObjectModel1
    }),
    FdViewAttributesTree.create({
      text: 'Импорт данных',
      type: 'master',
      children: noteNoteObjectModel2,
      copyChildren: noteNoteObjectModel2
    })
  ]);

  let noteObjectModel2 = Ember.A([
    FdViewAttributesTree.create({
      className: 'УчетРабочегоВремениWebL',
      description: 'test',
      text: 'Учет рабочего времени',
      type: 'property'
    }),
    FdViewAttributesTree.create({
      className: 'ПроизводственныйКалендарьWebL',
      description: null,
      text: 'Производственный календарь',
      type: 'property',
    }),
  ]);

  let objectModel = Ember.A([
    FdViewAttributesTree.create({
      text: 'Администрирование',
      type: 'master',
      children: noteObjectModel1,
      copyChildren: noteObjectModel1
    }),
    FdViewAttributesTree.create({
      text: 'Поручения',
      type: 'master',
      children: noteObjectModel2,
      copyChildren: noteObjectModel2
    })
  ]);

  let xml = '' +
  '<Containers>' +
  '<ContainersList>' +
  '<Item ClassName="##########" MenuPath="Администрирование" Caption="" Description="" />' +
  '<Item ClassName="##########" MenuPath="Администрирование\\Настройки" Caption="" Description="" />' +
  '<Item ClassName="ПисьмоWebL" MenuPath="Администрирование\\Рассылка по e-mail" Caption="Настройка рассылки писем" Description="" />' +
  '<Item ClassName="ЖурналИмпортаWebL" MenuPath="Администрирование\\Импорт данных" Caption="Журнал импорта" Description="" />' +
  '<Item ClassName="УчетРабочегоВремениWebL" MenuPath="Поручения" Caption="Учет рабочего времени" Description="test" />' +
  '<Item ClassName="ПроизводственныйКалендарьWebL" MenuPath="Поручения" Caption="Производственный календарь" Description="" />' +
  '</ContainersList>' +
  '</Containers>';

  let transform = this.subject();
  assert.ok(transform);

  let deserializeResult = transform.deserialize(xml);
  assert.deepEqual(deserializeResult, objectModel, 'ConteinersTree deserialize does not work');

  let serializeResult = transform.serialize(deserializeResult);
  assert.equal(serializeResult, xml, 'ConteinersTree serialize does not work');
});
