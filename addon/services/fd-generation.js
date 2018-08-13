import Ember from 'ember';

export default Ember.Service.extend({
  /*
  TODO: сервис генерации, в котором сохраняются токены для обращения за статусом генерации. Этот сервис периодически опрашивает бакенд на предмет выполнилась ли генерация и если это произошло, то должен показать всплывающее окно с приглашением посмотреть на результаты.
  */
  lastGenerationToken: undefined
});