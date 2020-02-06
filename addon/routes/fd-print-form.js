import $ from 'jquery';
import Route from '@ember/routing/route';
import FdShareLoadData from '../mixins/fd-share-load-data';
import { get } from '@ember/object';

export default Route.extend(FdShareLoadData, FdShareLoadData, {
  afterModel() {    
    $(document).ready(function(){
      window.print();
    }); 
  },

  model(params) {
    let gototype = get(params , 'gototype');
    let gotoobj = get(params , 'gotoobj');
    let object = this.get('store').peekRecord(`${gototype}`, gotoobj); 
    return object 
  },   
});