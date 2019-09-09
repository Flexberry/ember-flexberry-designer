/**
  Update coordinates in pointer method and dnd.
*/
let forPointerMethodOverrideResizeAndDnd = function(e, x, y) {
  x = e.originalEvent.layerX === e.clientX ? x : e.originalEvent.layerX;
  y = e.originalEvent.layerY === e.clientY ? y : e.originalEvent.layerY;

  return {
    x: x,
    y: y
  };
};

/**
  Update coordinates in event 'PointerClick' for links and elements.
*/
let forLinkAndElementPointerClickEvent = function(e, x, y) {
  x = e.originalEvent.originalEvent.layerX === e.clientX ? x : e.originalEvent.originalEvent.layerX;
  y = e.originalEvent.originalEvent.layerY === e.clientY ? y : e.originalEvent.originalEvent.layerY;

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
