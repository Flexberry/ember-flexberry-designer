import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['formId'],
  listform: null,
  listforms: [],
  attributes: [
  {
    "name": "НуОченьДлинноеНазваниеАттрибута",
    "nameStr": "Логин",
    "description": null,
    "id": "20fea097-0dab-45ed-957e-542acccdf623",
    "hint": null,
    "orderNum": 2,
    "autoincrement": false,
    "caption": null,
    "realCaption": "Логин",
    "trim": true,
    "dataServiceExpression": null,
    "storage": null,
    "publishName": null,
    "realStorage": "Логин",
    "notNull": false,
    "order": false,
    "pBCustomAttributes": true,
    "pBGetEnd": true,
    "pBSetEnd": true,
    "pBGetStart": true,
    "pBSetStart": true,
    "type": "string",
    "defaultValue": null,
    "stored": true,
    "accessModifier": "Public"
  },
  {
    "name": "Name",
    "nameStr": "Name",
    "description": null,
    "id": "6f8cbbb3-abe1-4a60-b3d2-43882d5a7781",
    "hint": null,
    "orderNum": 1,
    "autoincrement": false,
    "caption": null,
    "realCaption": "Name",
    "trim": true,
    "dataServiceExpression": null,
    "storage": null,
    "publishName": null,
    "realStorage": "Name",
    "notNull": false,
    "order": false,
    "pBCustomAttributes": true,
    "pBGetEnd": true,
    "pBSetEnd": true,
    "pBGetStart": true,
    "pBSetStart": true,
    "type": "string",
    "defaultValue": null,
    "stored": true,
    "accessModifier": "Public"
  },
  ],



});
