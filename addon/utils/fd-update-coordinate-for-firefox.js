/**
  userAgent.
*/
let ua = navigator.userAgent;

/**
  Check current browser.
*/
let isFireFox = function() {
  return (ua.search(/Firefox/) !== -1);
};

/**
  Update coordinates in pointer method and dnd.
*/
let forPointerMethodOverrideResizeAndDnd = function(e, x, y) {
  if (isFireFox()) {
    x = e.originalEvent.layerX;
    y = e.originalEvent.layerY;
  }

  return {
    x: x,
    y: y
  };
};

/**
  Update coordinates in event 'PointerClick' for links and elements.
*/
let forLinkAndElementPointerClickEvent = function(e, x, y) {
  if (isFireFox()) {
    x = e.originalEvent.originalEvent.layerX;
    y = e.originalEvent.originalEvent.layerY;
  }

  return {
    x: x,
    y: y
  };
};

/**
  Update coordinates in event 'PointerClick' and 'ContextMenu' for blank.
*/
let forBlankEventPointerClickAndContextMenu = function(e) {
  let x = e.offsetX;
  let y = e.offsetY;

  return {
    x: x,
    y: y
  };
};


export {
  forPointerMethodOverrideResizeAndDnd,
  forLinkAndElementPointerClickEvent,
  forBlankEventPointerClickAndContextMenu,
};
