import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../templates/components/fd-sheet';
import $ from 'jquery';

export default Component.extend({
  layout,

  /**
    Custom button visible.

    @property customButton
    @type Bool
  */
  customButtonVisible: false,

  /**
    Custom button title.

    @property customButton
    @type String
  */
  customButtonTitle: undefined,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Flag: indicates whether to show toolbar.

    @property toolbarVisible
    @type Bool
  */
  toolbarVisible: true,

  /**
    Flag: indicates whether to not show button for new model.

    @property isNewModel
    @type Bool
  */
  isNewModel: false,

  /**
    Flag: indicates whether to show print button.

    @property printButtonVisible
    @type Bool
  */
 printButtonVisible: true,

  init() {
    this._super(...arguments);

    this.set('classNames', ['fd-sheet', `${this.get('sheetComponentName')}`]);
    this.set('classNameBindings',
    [
      `fdSheetService.sheetSettings.visibility.${this.get('sheetComponentName')}:visible`,
      `fdSheetService.sheetSettings.expanded.${this.get('sheetComponentName')}:expand`,
    ]);
  },

  actions: {
    /**
      Closing sheet.

      @method actions.closeSheet
    */
    closeSheet() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').closeSheet(sheetComponentName);
    },

    /**
      Expanding sheet.

      @method actions.expand
    */
    expand() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').expand(sheetComponentName);
    },

    /**
      Saving changes.

      @method actions.save
    */
    save() {
      this.get('saveController')();
    },

    /**
      Delete data.

      @method actions.delete
    */
    delete() {
      this.get('deleteController')();
    },

    /**
      Custom button action.

      @method actions.customButtonAction
    */
    customButtonAction() {
      this.get('customButtonController')();
    },

     /**
      Print button action.

      @method actions.printButtonAction
    */
   printButtonAction() {
      // this._printExport = function (options, diagrams) {
      let jqElements = $("div.fd-sheet-body .fd-uml-diagram-editor .joint-paper");
      let jqElements0 = $("html");
      let model = this.get('targetObject.selectedElement.model.data');
      let store = this.get('targetObject.store');
      var printWindow = window.open('/#/?inframe=1', '_blank');
      //window.open('', '_blank');
      //document.write(jqElements);
      if (printWindow) {
        
        var printDocument = printWindow.document;
        printDocument.open();

        // var body = document.createElement('body');
        // body.className = "ember-application";
        
        // var el0 = document.createElement('div');
        // el0.className = "pusher";
        // body.append(el0);

        // var el1 = document.createElement('div');
        // el1.className = "ui form ";
        // el0.append(el1);

        // var el2 = document.createElement('div');
        // el2.className = "flexberry-content";
        // el1.append(el2);

        // var el3 = document.createElement('div');
        // el3.className = "ui main container fluid";
        // el2.append(el3);
        // el3.appendChild(jqElements[0]);
        // printDocument.append(body);

        printDocument.write(jqElements0[0].innerHTML);

        // el.setAttributeNS(null, 'class', 'ui form');
        // printDocument.append(el);
        // printDocument.append(jqElements);

       
        // printDocument.write('<html class="desktop landscape"><head><style type="text/css"></style></head><body class="ember-application"><div class="ui form "><div class="full height"><div class="flexberry-content"><div class="ui main container fluid"><div id="ember2085" class="fd-sheet diagrams-sheet visible ember-view" style="transform: translate3d(calc(50% - 300px), 0px, 0px);"><div class="content-mini"><div class="fd-sheet-body"><div id="ember2248" class="fd-uml-diagram-editor ember-view"><div id="ember2263" class="ember-view joint-paper joint-theme-default" style="width: 640px; height: 571px; margin-bottom: 119px;">' + jqElements[0].innerHTML
        //  + '</div></div></div></div></div></div></div></div></div></body></html>');

        //printDocument.write('<html><head><style>@media print { @page { padding: 0; margin: 0; } }</style><title>' 
        //+ (options.text ? options.text : '') 
        // + '</title></head><body onload=\'window.print(); window.close();\'></body></html>');
        // jqElements.forEach(function(block) {
        //  var img = printDocument.createElement(jqElements[0].innerHTML);
        //   img.height = block.height - 20;
        //   img.width = block.width - 10;
        //   img.src = block.data;
        //   printDocument.body.appendChild(img);
        // });
        
        //printDocument.append(jqElements[0]);

      // let svgNS = 'http://www.w3.org/2000/svg';
      // let g = document.createElementNS(svgNS, 'g');
      // //let name = get(button, 'name');
      // g.setAttributeNS(null, 'class', '');
      // let circle = document.createElementNS(svgNS, 'circle');
      // let text = document.createElementNS(svgNS, 'text');
      // //text.innerHTML = get(button, 'text');
      // g.appendChild(circle);
      // g.appendChild(text);
      //printDocument.vel.append(g);

        printDocument.close();
        printWindow.focus();
        //printWindow.print();
      } else {
        throw new Error(this.exportError.popupWindowBlocked);
      }

    //   return diagrams;
    // };
  },
  }
});
