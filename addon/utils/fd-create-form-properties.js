
/**
  Get unique caption for new form.
  @method getNewFormCaption
*/
let getNewFormCaption = function(store, baseCaption, typeCaption) {
  let found = true;
  let allClasses = store.peekAll('fd-dev-class');
  let allViews = store.peekAll('fd-dev-view');
  let captionToReturn = '';
  let captionToFound = '';
  let i = 0;
  let iterateClasses = item => item.get('caption') === captionToFound || item.get('name') === captionToFound || item.get('nameStr') === captionToFound;
  let iterateViews = item => item.get('name') === captionToFound;
  while (found) {
    captionToFound = i === 0 ? `${baseCaption}${typeCaption}` : `${baseCaption}${i}${typeCaption}`;
    let foundClass = allClasses.find(iterateClasses);
    let foundView = allViews.find(iterateViews);

    // If class or view with specified name was found then we should try to generate another name (new edit form and new view should have same name).
    found = foundClass !== undefined || foundView !== undefined;
    if (!found) {
      captionToReturn = captionToFound;
    }

    i++;
  }

  return captionToReturn;
};

/**
  Get description for new form.
  @method getNewFormDescription
*/
let getNewFormDescription = function(caption) {
  var temp = '';
  var tempArray = [];

  for (let i = 0; i < caption.length; i++)
  {
    //If found capital letter...
    if (((caption.charCodeAt(i) >= 65 && caption.charCodeAt(i) <= 90) || (caption.charCodeAt(i) >= 1040 && caption.charCodeAt(i) <= 1071)) && temp !== '')
    {
      tempArray.push(temp);
      temp = caption.charAt(i);
    } else {
      temp += caption.charAt(i);
    }
  }

  tempArray.push(temp);
  for (let i = 0; i < tempArray.length; i++) {
    if (i > 0 && i < tempArray.length) {
      tempArray[i] = tempArray[i].toLowerCase();
    }
  }

  return tempArray.join(' ');
};

export {
  getNewFormCaption,
  getNewFormDescription
};
