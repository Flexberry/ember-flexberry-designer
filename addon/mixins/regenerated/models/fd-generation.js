import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  state: DS.attr('fd-generation-state'),
  generationReason: DS.attr('string'),
  userName: DS.attr('string'),
  isRunning: DS.attr('boolean'),
  percentComplete: DS.attr('number'),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'generations', async: false }),
  stepLogs: DS.hasMany('fd-generation-step-log', { inverse: 'generation', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditFormView', 'fd-generation', {
    startTime: Projection.attr('StartTime', { hidden: true }),
    endTime: Projection.attr('EndTime', { hidden: true }),
    state: Projection.attr('State', { hidden: true }),
    generationReason: Projection.attr('GenerationReason', { hidden: true }),
    userName: Projection.attr('UserName', { hidden: true }),
    isRunning: Projection.attr('IsRunning', { hidden: true }),
    percentComplete: Projection.attr('PercentComplete', { hidden: true }),
    stepLogs: Projection.hasMany('fd-generation-step-log', '', {
      time: Projection.attr(''),
      thisIsError: Projection.attr(''),
      isWarn: Projection.attr(''),
      text: Projection.attr('')
    })
  });
  modelClass.defineProjection('ListFormView', 'fd-generation', {
    userName: Projection.attr('Пользователь'),
    state: Projection.attr('Состояние'),
    startTime: Projection.attr('Время старта'),
    percentComplete: Projection.attr('% выполнения'),
    endTime: Projection.attr('Время окончания'),
    stage: Projection.belongsTo('fd-dev-stage', 'Имя стадии', {
      name: Projection.attr('Имя стадии')
    }),
    generationReason: Projection.attr('Действие')
  });
};
